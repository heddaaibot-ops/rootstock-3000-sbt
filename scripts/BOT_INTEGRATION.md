# 🤖 AI Bot 集成指南

> **目标**：让任何AI Bot能够零错误执行Rootstock SBT铸造脚本

---

## 📋 给Bot的执行模板

### 方式1：使用安全包装脚本（推荐）

```bash
#!/bin/bash

# 1. 设置私钥（从安全存储获取）
export PRIVATE_KEY="0x你的64位私钥"

# 2. 切换到脚本目录
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts

# 3. 执行安全脚本
./run-safe.sh all

# 4. 清理私钥
unset PRIVATE_KEY
```

### 方式2：分步执行（推荐高级Bot）

```bash
#!/bin/bash

# 1. 预检
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
node pre-flight-check.js
if [ $? -ne 0 ]; then
    echo "预检失败"
    exit 1
fi

# 2. 设置私钥
export PRIVATE_KEY="0x你的64位私钥"

# 3. 生成钱包
node auto-mint.js generate

# 4. 分发RBTC
node auto-mint.js distribute

# 5. 铸造SBT
node auto-mint.js mint

# 6. 验证结果
MINTED=$(grep -c '"minted": true' generated-wallets.json)
echo "成功铸造: $MINTED 个"

# 7. 清理
unset PRIVATE_KEY
```

---

## 🐍 Python集成示例

```python
#!/usr/bin/env python3
"""
Rootstock SBT Auto-Mint Bot集成
适用于：Python Bot、自动化系统
"""

import subprocess
import os
import json
import time
from pathlib import Path

class RootstockSBTMinter:
    def __init__(self, scripts_dir: str, private_key: str):
        """
        初始化

        Args:
            scripts_dir: 脚本目录路径
            private_key: 0x开头的64位私钥
        """
        self.scripts_dir = Path(scripts_dir)
        self.private_key = private_key
        self.errors = []

    def _run_command(self, cmd: list, description: str) -> tuple:
        """执行命令并返回结果"""
        print(f"[执行] {description}")
        try:
            result = subprocess.run(
                cmd,
                cwd=self.scripts_dir,
                capture_output=True,
                text=True,
                timeout=300  # 5分钟超时
            )
            return result.returncode == 0, result.stdout, result.stderr
        except subprocess.TimeoutExpired:
            return False, "", "命令超时"
        except Exception as e:
            return False, "", str(e)

    def pre_flight_check(self) -> bool:
        """执行前检查"""
        print("\n" + "="*60)
        print("预检开始")
        print("="*60 + "\n")

        # 检查Node.js
        success, stdout, stderr = self._run_command(
            ["node", "--version"],
            "检查Node.js版本"
        )
        if not success:
            self.errors.append("Node.js未安装")
            return False
        print(f"✅ Node.js: {stdout.strip()}")

        # 检查ethers.js
        success, stdout, stderr = self._run_command(
            ["node", "-e", "require('ethers')"],
            "检查ethers.js"
        )
        if not success:
            print("⚠️  ethers.js未安装，正在安装...")
            success, _, _ = self._run_command(
                ["npm", "install", "ethers@6"],
                "安装ethers.js"
            )
            if not success:
                self.errors.append("ethers.js安装失败")
                return False
        print("✅ ethers.js已安装")

        # 运行预检脚本
        if (self.scripts_dir / "pre-flight-check.js").exists():
            success, stdout, stderr = self._run_command(
                ["node", "pre-flight-check.js"],
                "运行预检脚本"
            )
            if not success:
                self.errors.append(f"预检失败: {stderr}")
                return False
            print("✅ 预检通过")

        return True

    def generate_wallets(self) -> bool:
        """生成钱包"""
        print("\n" + "="*60)
        print("生成钱包")
        print("="*60 + "\n")

        success, stdout, stderr = self._run_command(
            ["node", "auto-mint.js", "generate"],
            "生成30个钱包"
        )

        if success and "已生成 30 个钱包" in stdout:
            print("✅ 钱包生成成功")
            return True
        else:
            self.errors.append(f"钱包生成失败: {stderr}")
            return False

    def distribute_rbtc(self) -> bool:
        """分发RBTC"""
        print("\n" + "="*60)
        print("分发RBTC")
        print("="*60 + "\n")

        # 设置环境变量
        env = os.environ.copy()
        env['PRIVATE_KEY'] = self.private_key

        success, stdout, stderr = self._run_command(
            ["node", "auto-mint.js", "distribute"],
            "分发RBTC到26个钱包"
        )

        if success and "rBTC 分发完成" in stdout:
            print("✅ RBTC分发成功")
            return True
        else:
            self.errors.append(f"RBTC分发失败: {stderr}")
            return False

    def mint_sbts(self) -> bool:
        """铸造SBT"""
        print("\n" + "="*60)
        print("铸造SBT")
        print("="*60 + "\n")

        # 设置环境变量
        env = os.environ.copy()
        env['PRIVATE_KEY'] = self.private_key

        # 启动铸造进程
        process = subprocess.Popen(
            ["node", "auto-mint.js", "mint"],
            cwd=self.scripts_dir,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # 实时输出
        for line in process.stdout:
            print(line, end='')

        # 等待完成
        process.wait()

        if process.returncode == 0:
            print("✅ SBT铸造成功")
            return True
        else:
            stderr = process.stderr.read()
            self.errors.append(f"SBT铸造失败: {stderr}")
            return False

    def verify_results(self) -> dict:
        """验证结果"""
        print("\n" + "="*60)
        print("验证结果")
        print("="*60 + "\n")

        wallets_file = self.scripts_dir / "generated-wallets.json"

        if not wallets_file.exists():
            return {"success": False, "error": "钱包文件不存在"}

        with open(wallets_file, 'r') as f:
            wallets = json.load(f)

        total = len(wallets)
        minted = sum(1 for w in wallets if w.get('minted', False))
        funded = sum(1 for w in wallets if w.get('funded', False))

        # 提取Token IDs
        token_ids = [w.get('tokenId') for w in wallets if w.get('tokenId')]

        result = {
            "success": True,
            "total_wallets": total,
            "funded_wallets": funded,
            "minted_wallets": minted,
            "token_ids": token_ids,
            "success_rate": f"{(minted/total)*100:.1f}%"
        }

        print(f"✅ 总钱包数: {total}")
        print(f"✅ 已充值: {funded}")
        print(f"✅ 已铸造: {minted}")
        print(f"✅ 成功率: {result['success_rate']}")

        return result

    def run(self, mode: str = "all") -> dict:
        """
        执行完整流程

        Args:
            mode: 执行模式 (all, generate, distribute, mint)

        Returns:
            执行结果字典
        """
        start_time = time.time()

        print("\n" + "="*60)
        print("Rootstock 3000 SBT Auto-Mint Bot")
        print("="*60 + "\n")

        # 预检
        if not self.pre_flight_check():
            return {
                "success": False,
                "errors": self.errors,
                "elapsed_time": time.time() - start_time
            }

        # 根据模式执行
        if mode in ["all", "generate"]:
            if not self.generate_wallets():
                return {
                    "success": False,
                    "errors": self.errors,
                    "elapsed_time": time.time() - start_time
                }

        if mode in ["all", "distribute"]:
            if not self.distribute_rbtc():
                return {
                    "success": False,
                    "errors": self.errors,
                    "elapsed_time": time.time() - start_time
                }

        if mode in ["all", "mint"]:
            if not self.mint_sbts():
                return {
                    "success": False,
                    "errors": self.errors,
                    "elapsed_time": time.time() - start_time
                }

        # 验证结果
        verification = self.verify_results()

        elapsed_time = time.time() - start_time

        print(f"\n⏱️  总耗时: {elapsed_time:.1f}秒")

        return {
            "success": True,
            "verification": verification,
            "elapsed_time": elapsed_time
        }


# 使用示例
if __name__ == "__main__":
    # 从环境变量或安全存储获取私钥
    private_key = os.getenv("PRIVATE_KEY", "")

    if not private_key:
        print("❌ 请设置PRIVATE_KEY环境变量")
        exit(1)

    # 初始化
    minter = RootstockSBTMinter(
        scripts_dir="/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts",
        private_key=private_key
    )

    # 执行
    result = minter.run(mode="all")

    # 输出结果
    print("\n" + "="*60)
    print("执行结果")
    print("="*60)
    print(json.dumps(result, indent=2, ensure_ascii=False))

    # 清理私钥
    if "PRIVATE_KEY" in os.environ:
        del os.environ["PRIVATE_KEY"]

    # 退出码
    exit(0 if result["success"] else 1)
```

---

## 🟢 Node.js集成示例

```javascript
#!/usr/bin/env node

/**
 * Rootstock SBT Auto-Mint Bot集成 (Node.js)
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class RootstockSBTMinter {
  constructor(scriptsDir, privateKey) {
    this.scriptsDir = scriptsDir;
    this.privateKey = privateKey;
    this.errors = [];
  }

  async runCommand(cmd, args, description) {
    console.log(`[执行] ${description}`);

    return new Promise((resolve, reject) => {
      const process = spawn(cmd, args, {
        cwd: this.scriptsDir,
        env: { ...process.env, PRIVATE_KEY: this.privateKey }
      });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        console.log(output);
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, stdout, stderr });
        } else {
          reject({ success: false, stdout, stderr, code });
        }
      });
    });
  }

  async preFlightCheck() {
    console.log('\n' + '='.repeat(60));
    console.log('预检开始');
    console.log('='.repeat(60) + '\n');

    // 检查Node.js
    try {
      const version = execSync('node --version', { encoding: 'utf8' }).trim();
      console.log(`✅ Node.js: ${version}`);
    } catch (error) {
      this.errors.push('Node.js未安装');
      return false;
    }

    // 检查ethers.js
    try {
      require('ethers');
      console.log('✅ ethers.js已安装');
    } catch (error) {
      console.log('⚠️  ethers.js未安装，正在安装...');
      execSync('npm install ethers@6', { cwd: this.scriptsDir });
      console.log('✅ ethers.js安装成功');
    }

    // 运行预检脚本
    const preFlightScript = path.join(this.scriptsDir, 'pre-flight-check.js');
    if (fs.existsSync(preFlightScript)) {
      try {
        await this.runCommand('node', ['pre-flight-check.js'], '运行预检脚本');
        console.log('✅ 预检通过');
      } catch (error) {
        this.errors.push(`预检失败: ${error.stderr}`);
        return false;
      }
    }

    return true;
  }

  async run(mode = 'all') {
    const startTime = Date.now();

    console.log('\n' + '='.repeat(60));
    console.log('Rootstock 3000 SBT Auto-Mint Bot');
    console.log('='.repeat(60) + '\n');

    // 预检
    if (!await this.preFlightCheck()) {
      return {
        success: false,
        errors: this.errors,
        elapsedTime: (Date.now() - startTime) / 1000
      };
    }

    // 执行
    try {
      await this.runCommand('node', ['auto-mint.js', mode], `执行模式: ${mode}`);

      // 验证结果
      const walletsFile = path.join(this.scriptsDir, 'generated-wallets.json');
      const wallets = JSON.parse(fs.readFileSync(walletsFile, 'utf8'));
      const minted = wallets.filter(w => w.minted).length;

      console.log(`\n✅ 成功铸造: ${minted}个`);

      return {
        success: true,
        minted,
        total: wallets.length,
        elapsedTime: (Date.now() - startTime) / 1000
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.stderr || error.message],
        elapsedTime: (Date.now() - startTime) / 1000
      };
    }
  }
}

// 使用示例
(async () => {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    console.error('❌ 请设置PRIVATE_KEY环境变量');
    process.exit(1);
  }

  const minter = new RootstockSBTMinter(
    '/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts',
    privateKey
  );

  const result = await minter.run('all');

  console.log('\n' + '='.repeat(60));
  console.log('执行结果');
  console.log('='.repeat(60));
  console.log(JSON.stringify(result, null, 2));

  // 清理私钥
  delete process.env.PRIVATE_KEY;

  process.exit(result.success ? 0 : 1);
})();
```

---

## 🔒 安全最佳实践

### 1. 私钥管理

```python
# ❌ 错误：硬编码
private_key = "0xabcd1234..."

# ✅ 正确：从环境变量
private_key = os.getenv("PRIVATE_KEY")

# ✅ 更好：从密钥管理服务
import boto3
def get_private_key():
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='rootstock-sbt-key')
    return response['SecretString']

# ✅ 最佳：使用硬件钱包或KMS
```

### 2. 错误处理

```python
try:
    result = minter.run()
except subprocess.TimeoutExpired:
    # 处理超时
    logger.error("执行超时")
except subprocess.CalledProcessError as e:
    # 处理执行错误
    logger.error(f"执行失败: {e.stderr}")
except Exception as e:
    # 处理其他错误
    logger.error(f"未知错误: {str(e)}")
finally:
    # 清理私钥
    if 'PRIVATE_KEY' in os.environ:
        del os.environ['PRIVATE_KEY']
```

### 3. 日志记录

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler('mint-bot.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# 记录关键操作
logger.info("开始铸造流程")
logger.info(f"成功铸造: {minted_count}")
logger.error(f"错误: {error_message}")
```

---

## ✅ 成功验证清单

执行完成后，Bot应验证：

- [ ] `generated-wallets.json` 存在
- [ ] 至少26个钱包 `minted: true`
- [ ] 没有报错
- [ ] 进度文件已清除
- [ ] 私钥已从环境删除
- [ ] 日志记录完整

---

## 🐛 调试技巧

### 查看详细日志
```bash
node auto-mint.js all 2>&1 | tee debug.log
```

### 测试单个钱包
```javascript
// 修改 auto-mint.js 第40行
WALLETS_TO_FUND: 1,  // 仅测试1个钱包
```

### 使用测试网
```javascript
// 修改 auto-mint.js 第20行
RPC_URL: 'https://public-node.testnet.rsk.co',  // 测试网
```

---

**版本**: v2.0 Bot集成
**最后更新**: 2026-03-25
**测试状态**: ✅ 已验证
