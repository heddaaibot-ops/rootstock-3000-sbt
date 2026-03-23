#!/bin/bash

RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x22cd1c7b62a9cda1fc1868ae0deab62f6fd57800","latest"],"id":1}' \
  https://public-node.rsk.co)

echo "$RESPONSE" | python3 << 'EOF'
import sys, json
data = json.load(sys.stdin)
balance_wei = int(data['result'], 16)
balance_rbtc = balance_wei / 1e18
print(f'Balance: {balance_rbtc} RBTC')
if balance_rbtc >= 0.001:
    print('✅ 余额充足，可以开始部署！')
else:
    print('⚠️ 余额不足 0.001 RBTC')
    sys.exit(1)
EOF
