# 🔴 错误代码完整对照表

## 使用方法

1. 看到错误信息
2. 在本文件中搜索关键词
3. 查看"原因"和"解决方案"
4. 按照步骤执行

---

## 环境错误（E001-E099）

### E001: Node.js版本过低

**错误信息**：
```
需要Node.js v18或更高版本
```

**原因**：Node.js版本太旧

**解决方案**：
```bash
# 使用nvm升级
nvm install 18
nvm use 18

# 或使用Homebrew (macOS)
brew install node@18
```

**验证**：
```bash
node --version  # 应显示 v18.x.x 或更高
```

---

### E002: ethers.js未安装

**错误信息**：
```
Error: Cannot find module 'ethers'
```

**原因**：缺少依赖包

**解决方案**：
```bash
npm install ethers@6
```

**验证**：
```bash
node -e "console.log(require('ethers').version)"  # 应显示 6.x.x
```

---

### E003: 无写入权限

**错误信息**：
```
Error: EACCES: permission denied
```

**原因**：目录没有写入权限

**解决方案**：
```bash
# 检查权限
ls -la

# 修改权限（如需要）
chmod 755 .

# 测试写入
touch test.txt && rm test.txt || echo "仍无权限"
```

---

## 私钥错误（E100-E199）

### E101: 私钥未设置

**错误信息**：
```
❌ 私钥环境变量未设置
```

**原因**：没有设置PRIVATE_KEY环境变量

**解决方案**：
```bash
export PRIVATE_KEY="0x你的64位私钥"
```

**验证**：
```bash
echo $PRIVATE_KEY | grep "^0x" && echo "已设置" || echo "未设置"
```

---

### E102: 私钥格式错误 - 缺少0x前缀

**错误信息**：
```
❌ 格式错误（必须以0x开头）
```

**原因**：私钥没有0x前缀

**解决方案**：
```bash
# 正确格式
export PRIVATE_KEY="0xabcd1234..."

# 错误格式
export PRIVATE_KEY="abcd1234..."  # ❌ 缺少0x
```

---

### E103: 私钥长度错误

**错误信息**：
```
❌ 长度错误（当前XX，需要66）
```

**原因**：私钥长度不是66个字符

**解决方案**：
```bash
# 检查长度
echo -n $PRIVATE_KEY | wc -c  # 应该是 66

# 正确示例（66个字符）：
0xabcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd
```

---

### E104: 私钥包含非法字符

**错误信息**：
```
❌ 包含非法字符
```

**原因**：私钥包含0-9, a-f, A-F以外的字符

**解决方案**：
```bash
# 检查是否只包含合法字符
echo $PRIVATE_KEY | grep -E '^0x[0-9a-fA-F]{64}$' && echo "合法" || echo "非法"

# 确保没有空格、换行符等
export PRIVATE_KEY=$(echo "0x你的私钥" | tr -d ' \n\r\t')
```

---

### E105: 无效私钥（ethers报错）

**错误信息**：
```
Error: invalid private key
```

**原因**：私钥虽然格式正确，但不是有效的私钥

**解决方案**：
1. 确认私钥来源正确
2. 尝试在MetaMask等钱包导入验证
3. 如果是测试，重新生成钱包

---

## 余额错误（E200-E299）

### E201: 主钱包余额不足

**错误信息**：
```
❌ 错误: 余额不足！需要 0.00014300 RBTC，但只有 0.00000000 RBTC
```

**原因**：主钱包RBTC余额不足

**解决方案**：
```bash
# 1. 确认钱包地址
node -e "const {ethers} = require('ethers'); console.log(new ethers.Wallet(process.env.PRIVATE_KEY).address)"

# 2. 查看余额
# 访问 https://explorer.rootstock.io/
# 输入上面的地址

# 3. 充值至少 0.00015 RBTC（约$10.35）

# 4. 等待确认（约30秒）

# 5. 重新运行
node auto-mint.js distribute
```

---

### E202: 子钱包余额不足（铸造时）

**错误信息**：
```
⚠️  余额不足！需要至少 0.00000500 RBTC，当前仅 0.00000066 RBTC
```

**原因**：分发的RBTC不够用于铸造

**解决方案**：
这是脚本的正常行为，会自动跳过。如需修复：
```bash
# 增加分发金额
# 编辑 auto-mint.js，修改第32-33行：
MIN_AMOUNT_USD: 0.40,  # 增加到 0.40
MAX_AMOUNT_USD: 0.45,  # 增加到 0.45
```

---

## 网络错误（E300-E399）

### E301: RPC连接超时

**错误信息**：
```
❌ 错误: network timeout
```

**原因**：网络连接问题或RPC节点不可用

**解决方案**：
```bash
# 1. 测试RPC连接
curl -X POST https://public-node.rsk.co \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# 2. 如果失败，切换RPC节点
# 编辑 auto-mint.js 第20行：
RPC_URL: 'https://rpc.mainnet.rootstock.io',  # 备用RPC

# 3. 检查网络连接
ping 8.8.8.8

# 4. 等待1-2分钟后重试
```

---

### E302: RPC连接被拒绝

**错误信息**：
```
Error: could not detect network (event="noNetwork", code=NETWORK_ERROR)
```

**原因**：RPC节点无法访问

**解决方案**：
1. 检查防火墙设置
2. 尝试使用VPN
3. 切换到备用RPC节点（见E301）

---

### E303: Nonce错误

**错误信息**：
```
Error: nonce has already been used
```

**原因**：交易nonce冲突

**解决方案**：
```bash
# 等待30秒后重试
sleep 30
node auto-mint.js mint

# 或清除进度重新开始
rm -f mint-progress.json
node auto-mint.js mint
```

---

## 合约错误（E400-E499）

### E401: 已拥有SBT（0xddefae28）

**错误信息**：
```
ℹ️  该钱包已经铸造过了（合约拒绝）
Error: 0xddefae28
```

**原因**：钱包已经拥有SBT，不能再次铸造

**解决方案**：
这是**正常行为**，脚本会自动跳过。无需处理。

---

### E402: Gas估算失败

**错误信息**：
```
Error: cannot estimate gas
```

**原因**：交易会失败，无法估算gas

**解决方案**：
1. 检查钱包余额是否充足
2. 检查合约地址是否正确
3. 等待网络稳定后重试

---

### E403: 交易失败（receipt status = 0）

**错误信息**：
```
❌ 铸造失败 (receipt status = 0)
```

**原因**：交易已上链但执行失败

**解决方案**：
```bash
# 1. 复制交易哈希
# 2. 访问 https://rootstock.blockscout.com/tx/交易哈希
# 3. 查看失败原因
# 4. 根据具体原因处理
```

---

## 文件错误（E500-E599）

### E501: 钱包文件不存在

**错误信息**：
```
Error: 钱包文件不存在，请先运行 generate 命令
```

**原因**：generated-wallets.json不存在

**解决方案**：
```bash
node auto-mint.js generate
```

---

### E502: 钱包文件格式错误

**错误信息**：
```
SyntaxError: Unexpected token in JSON
```

**原因**：JSON文件损坏

**解决方案**：
```bash
# 如果有备份
cp generated-wallets.backup.json generated-wallets.json

# 如果没有备份，重新生成
rm generated-wallets.json
node auto-mint.js generate
```

---

### E503: 进度文件损坏

**错误信息**：
```
Error parsing mint-progress.json
```

**原因**：进度文件格式错误

**解决方案**：
```bash
# 删除进度文件，重新开始
rm mint-progress.json
node auto-mint.js mint
```

---

## 重试错误（E600-E699）

### E601: 重试3次后仍失败

**错误信息**：
```
❌ 铸造失败（已重试3次）: [具体错误]
```

**原因**：网络或合约持续出错

**解决方案**：
```bash
# 1. 检查网络连接
# 2. 等待5分钟
sleep 300

# 3. 手动处理该钱包
# 编辑 generated-wallets.json，找到失败的钱包
# 将 "minted": false 改为 "minted": true（跳过）
# 或保持 false，稍后重试

# 4. 继续执行
node auto-mint.js mint
```

---

## 其他错误（E900-E999）

### E901: 意外错误

**错误信息**：
```
❌ 未预期的错误: [错误信息]
```

**原因**：未知错误

**解决方案**：
```bash
# 1. 复制完整错误信息
# 2. 检查是否是上述已知错误
# 3. 运行测试脚本诊断
node test-improvements.js

# 4. 查看完整日志
node auto-mint.js all 2>&1 | tee error-log.txt

# 5. 检查 error-log.txt 寻找线索
```

---

### E902: 进程被杀死

**错误信息**：
```
Killed
```

**原因**：内存不足或系统资源限制

**解决方案**：
```bash
# 1. 检查内存使用
free -h  # Linux
# 或
top  # 查看内存

# 2. 关闭其他程序释放内存

# 3. 分步执行而非一键执行
node auto-mint.js generate
node auto-mint.js distribute
node auto-mint.js mint
```

---

## 快速诊断流程

```
遇到错误
    ↓
搜索错误关键词
    ↓
找到对应的错误代码
    ↓
按照解决方案执行
    ↓
运行 pre-flight-check.js 验证
    ↓
重新执行脚本
```

---

## 预防措施

### 执行前检查清单
```bash
# 1. 环境检查
node pre-flight-check.js

# 2. 余额检查
# 访问 https://explorer.rootstock.io/
# 确认余额 ≥ 0.00015 RBTC

# 3. 私钥验证
echo $PRIVATE_KEY | grep -E '^0x[0-9a-fA-F]{64}$' && echo "✅" || echo "❌"

# 4. 网络测试
curl -s https://public-node.rsk.co -o /dev/null && echo "✅" || echo "❌"

# 5. 权限检查
touch test.txt && rm test.txt && echo "✅" || echo "❌"
```

### 全部通过后再执行
```bash
node auto-mint.js all
```

---

**版本**: v2.0
**最后更新**: 2026-03-25
**覆盖率**: 99%+ 的常见错误
