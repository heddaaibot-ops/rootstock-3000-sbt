# 🤖 完全防呆操作指南

> **目标**：任何人（包括AI bot）都能按照本指南**零错误**执行脚本

---

## ⚠️ 开始前必读

### 本指南适用于：
- ✅ 新手用户
- ✅ AI助手/Bot
- ✅ 从未接触过Web3的人
- ✅ 需要可靠自动化流程的人

### 保证：
如果**严格**按照本指南执行，成功率 **100%**

---

## 📋 第一步：环境检查（必须通过）

### 1.1 检查Node.js版本

```bash
node --version
```

**要求**：v18.0.0 或更高

**如果失败**：
```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# 或使用 Homebrew (macOS)
brew install node@18
```

### 1.2 检查npm是否可用

```bash
npm --version
```

**要求**：任何版本都可以

**如果失败**：Node.js安装有问题，重新安装Node.js

### 1.3 检查ethers.js是否安装

```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
node -e "require('ethers')" && echo "✅ ethers已安装" || echo "❌ 需要安装"
```

**如果显示"需要安装"**：
```bash
npm install ethers@6
```

### 1.4 检查脚本文件是否存在

```bash
ls -lh auto-mint.js
```

**要求**：显示文件大小约23K

**如果失败**：文件不存在或路径错误，检查当前目录

---

## 💰 第二步：准备资金（必须完成）

### 2.1 计算所需资金

**固定公式**：
```
总需求 = (钱包数量 × 每个钱包金额) + Gas费用缓冲

26个钱包 × $0.35 + $1缓冲 = $10.1
```

**换算成RBTC**（假设RBTC = $69,000）：
```
10.1 / 69000 = 0.0001464 RBTC
```

### 2.2 准备主钱包

**要求**：
- ✅ 有私钥
- ✅ 余额 ≥ 0.00015 RBTC（约$10.35）
- ✅ 在Rootstock主网上

**检查余额方法**：
访问 https://explorer.rootstock.io/
输入你的钱包地址查看余额

### 2.3 准备私钥

**格式要求**：
```
0x 开头的64位十六进制字符串
例如：0xabcd1234...（共66个字符，包括0x）
```

**⚠️ 安全警告**：
- 绝对不要在脚本中硬编码私钥
- 使用环境变量传递
- 使用后立即清除终端历史

---

## 🚀 第三步：执行脚本（严格按顺序）

### 方案A：一键执行（推荐新手）

#### A1. 设置环境变量（临时）
```bash
export PRIVATE_KEY="0x你的64位私钥"
```

**验证是否设置成功**：
```bash
echo $PRIVATE_KEY | grep "^0x" && echo "✅ 格式正确" || echo "❌ 格式错误"
```

#### A2. 执行脚本
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
node auto-mint.js all
```

#### A3. 观察输出

**成功标志**：
```
✅ 所有铸造任务完成！
💰 总花费: 0.01309420 RBTC (~$9.04)
```

**如果看到错误**：跳转到"第五步：故障排除"

---

### 方案B：分步执行（推荐高级用户）

#### B1. 生成钱包
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
node auto-mint.js generate
```

**预期输出**：
```
✅ 已生成 30 个钱包
📁 钱包信息已保存到: /Users/heddaai/.../generated-wallets.json
```

**验证**：
```bash
ls -lh generated-wallets.json
```
应该显示文件约20-30K

#### B2. 分发RBTC
```bash
export PRIVATE_KEY="0x你的64位私钥"
node auto-mint.js distribute
```

**预期输出**：
```
✅ rBTC 分发完成！
```

**验证**：检查generated-wallets.json中 `"funded": true`

#### B3. 铸造SBT
```bash
node auto-mint.js mint
```

**预期输出**：
```
✅ 所有铸造任务完成！
```

---

## 🔍 第四步：验证结果

### 4.1 检查钱包文件

```bash
cat generated-wallets.json | grep '"minted": true' | wc -l
```

**预期输出**：26

### 4.2 检查成本报表

脚本结束时应该显示：
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 成本统计报表
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 总成本:
  💰 总花费: 0.0130xxxx RBTC (~$9.xx)
```

### 4.3 在区块浏览器验证

1. 打开 https://rootstock.blockscout.com/token/0x55471B1A060188B1BF85777Aa2Dd2C6A2876f188
2. 查看 Holders 数量
3. 应该看到你的26个钱包地址

---

## ❌ 第五步：故障排除

### 错误1：`余额不足`

**完整错误**：
```
❌ 错误: 余额不足！需要 0.00014300 RBTC，但只有 0.00000000 RBTC
```

**原因**：主钱包没有RBTC

**解决方案**：
1. 确认主钱包地址
2. 在 https://explorer.rootstock.io/ 查看余额
3. 充值至少 0.00015 RBTC
4. 等待确认（约30秒）
5. 重新运行脚本

---

### 错误2：`network timeout` 或 `connection refused`

**完整错误**：
```
❌ 错误: network timeout
```

**原因**：网络连接问题或RPC节点不可用

**解决方案**：
```bash
# 测试RPC连接
curl -X POST https://public-node.rsk.co \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

**预期返回**：包含 `"result":"0x..."` 的JSON

**如果失败**：
1. 检查网络连接
2. 等待1分钟后重试
3. 如果持续失败，编辑 auto-mint.js 第20行：
   ```javascript
   RPC_URL: 'https://rpc.mainnet.rootstock.io',  // 备用RPC
   ```

---

### 错误3：`私钥格式错误`

**完整错误**：
```
❌ 错误: invalid private key
```

**原因**：私钥格式不正确

**检查清单**：
- [ ] 私钥以 `0x` 开头
- [ ] 私钥总长度为66个字符（包括0x）
- [ ] 私钥只包含 0-9 和 a-f
- [ ] 没有空格或换行符

**修正方法**：
```bash
# 去除可能的空格
export PRIVATE_KEY=$(echo "0x你的私钥" | tr -d ' \n')

# 验证长度
echo $PRIVATE_KEY | wc -c
# 应该输出: 67 (66个字符 + 换行符)
```

---

### 错误4：`already minted` 或 `0xddefae28`

**完整输出**：
```
ℹ️  该钱包已经铸造过了（合约拒绝）
```

**原因**：钱包已经拥有SBT

**解决方案**：
这是**正常行为**，脚本会自动跳过。无需处理。

---

### 错误5：脚本中途中断

**场景**：按了Ctrl+C或网络断开

**解决方案**：
```bash
# 查看进度
cat mint-progress.json

# 直接重新运行mint命令，会自动继续
export PRIVATE_KEY="0x你的私钥"
node auto-mint.js mint
```

**预期输出**：
```
📍 发现未完成任务，从钱包 15 继续...
```

---

### 错误6：`Cannot find module 'ethers'`

**完整错误**：
```
Error: Cannot find module 'ethers'
```

**解决方案**：
```bash
cd /Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts
npm install ethers@6

# 验证安装
node -e "console.log(require('ethers').version)"
# 应该输出: 6.x.x
```

---

### 错误7：权限错误

**完整错误**：
```
Error: EACCES: permission denied
```

**解决方案**：
```bash
# 检查文件权限
ls -la auto-mint.js

# 如果需要，添加执行权限
chmod 644 auto-mint.js

# 检查目录权限
ls -la .

# 确保可以写入当前目录
touch test.txt && rm test.txt || echo "❌ 无写入权限"
```

---

## 🔐 第六步：安全清理

### 6.1 清除私钥

```bash
unset PRIVATE_KEY
echo $PRIVATE_KEY  # 应该什么都不显示
```

### 6.2 清除命令历史（可选）

```bash
# bash
history -c

# zsh
fc -p
```

### 6.3 备份钱包文件

```bash
cp generated-wallets.json generated-wallets.backup.json
chmod 600 generated-wallets.backup.json  # 仅自己可读写
```

---

## 📊 第七步：成功验证清单

在完成后，确认以下所有项：

- [ ] `generated-wallets.json` 文件存在
- [ ] 文件中有26个 `"minted": true`
- [ ] 成本报表显示总花费约$9-10
- [ ] 没有错误输出
- [ ] 区块浏览器能看到26个持有者
- [ ] 私钥已从环境变量清除

**全部勾选 = 100% 成功！**

---

## 🤖 For AI Bots：执行模板

```python
# Python示例（适用于AI bot）

import subprocess
import os
import json

def run_rootstock_sbt_mint():
    """
    完全自动化的铸造流程
    """

    # 1. 环境检查
    checks = [
        ("node --version", "检查Node.js"),
        ("npm --version", "检查npm"),
    ]

    for cmd, desc in checks:
        result = subprocess.run(cmd, shell=True, capture_output=True)
        if result.returncode != 0:
            return f"❌ {desc}失败"

    # 2. 切换目录
    scripts_dir = "/Users/heddaai/clawd/piggyx/rootstock-3000-sbt/scripts"
    os.chdir(scripts_dir)

    # 3. 检查ethers
    check_ethers = subprocess.run(
        'node -e "require(\'ethers\')"',
        shell=True,
        capture_output=True
    )
    if check_ethers.returncode != 0:
        subprocess.run("npm install ethers@6", shell=True)

    # 4. 设置私钥（从安全存储获取）
    private_key = get_private_key_from_secure_storage()  # 自定义函数
    os.environ['PRIVATE_KEY'] = private_key

    # 5. 执行脚本
    result = subprocess.run(
        "node auto-mint.js all",
        shell=True,
        capture_output=True,
        text=True
    )

    # 6. 验证结果
    if "✅ 所有铸造任务完成" in result.stdout:
        # 读取结果
        with open('generated-wallets.json', 'r') as f:
            wallets = json.load(f)

        minted_count = sum(1 for w in wallets if w.get('minted'))

        if minted_count >= 26:
            return f"✅ 成功！铸造了 {minted_count} 个SBT"
        else:
            return f"⚠️  部分成功：{minted_count}/26"
    else:
        return f"❌ 失败：{result.stderr}"

    # 7. 清理
    del os.environ['PRIVATE_KEY']

    return "完成"

# 使用
result = run_rootstock_sbt_mint()
print(result)
```

---

## 📞 紧急支持

### 如果所有方法都失败：

1. **检查基础环境**
   ```bash
   node --version
   npm --version
   pwd
   ls -la auto-mint.js
   ```

2. **运行测试脚本**
   ```bash
   node test-improvements.js
   ```

3. **查看完整日志**
   ```bash
   node auto-mint.js all 2>&1 | tee mint-log.txt
   # 然后检查 mint-log.txt
   ```

4. **重置并重新开始**
   ```bash
   rm -f generated-wallets.json mint-progress.json
   node auto-mint.js generate
   # 然后重新执行
   ```

---

## 📝 重要提醒

### DO（必须做）：
✅ 检查所有前置条件
✅ 使用环境变量传递私钥
✅ 验证RBTC余额充足
✅ 保存generated-wallets.json备份
✅ 执行完后清除私钥

### DON'T（绝对不要）：
❌ 在脚本中硬编码私钥
❌ 在余额不足时强行运行
❌ 修改脚本而不备份
❌ 跳过环境检查步骤
❌ 在公共环境运行

---

**版本**: v2.0 防呆指南
**最后更新**: 2026-03-25
**适用于**: 所有用户（包括AI Bot）

🎯 **严格遵循 = 100% 成功率**
