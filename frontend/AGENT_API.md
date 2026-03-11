# Agent API Documentation

This API allows AI agents and bots to programmatically mint Rootstock 3000 Days SBTs.

## Base URL

```
https://your-frontend-domain.vercel.app/api/mint
```

## Endpoints

### 1. Check Minting Status

**GET** `/api/mint`

Query parameters:
- `address` (optional): Wallet address to check if already minted

**Example Request:**
```bash
curl "https://your-domain.vercel.app/api/mint?address=0x..."
```

**Example Response:**
```json
{
  "status": "active",
  "totalSupply": 1234,
  "remainingSupply": 8766,
  "maxSupply": 10000,
  "hasMinted": false,
  "address": "0x..."
}
```

---

### 2. Mint SBT (Agent)

**POST** `/api/mint`

**Request Body:**

Option A: Mint with private key
```json
{
  "privateKey": "0x..."
}
```

Option B: Check status only
```json
{
  "walletAddress": "0x..."
}
```

**Example Request (Mint):**
```bash
curl -X POST https://your-domain.vercel.app/api/mint \
  -H "Content-Type: application/json" \
  -d '{"privateKey": "0x..."}'
```

**Success Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "address": "0x...",
  "blockNumber": 12345,
  "gasUsed": 166602,
  "message": "SBT minted successfully!"
}
```

**Error Responses:**

Already minted:
```json
{
  "error": "Address has already minted",
  "address": "0x..."
}
```

Minting paused:
```json
{
  "error": "Minting is currently paused",
  "status": "paused",
  "totalSupply": 1234,
  "remainingSupply": 8766
}
```

Max supply reached:
```json
{
  "error": "Max supply reached",
  "status": "sold_out",
  "totalSupply": 10000
}
```

---

## Usage Examples

### For AI Agents (Python)

```python
import requests
import os

AGENT_PRIVATE_KEY = os.getenv("AGENT_PRIVATE_KEY")
API_URL = "https://your-domain.vercel.app/api/mint"

# Check status first
response = requests.post(
    API_URL,
    json={"walletAddress": "0x..."}
)
print(response.json())

# Mint if not minted
if not response.json().get("hasMinted"):
    response = requests.post(
        API_URL,
        json={"privateKey": AGENT_PRIVATE_KEY}
    )
    print(response.json())
```

### For AI Agents (JavaScript/Node.js)

```javascript
const axios = require('axios');

const AGENT_PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;
const API_URL = 'https://your-domain.vercel.app/api/mint';

async function mintSBT() {
  try {
    // Check status
    const statusRes = await axios.get(API_URL);
    console.log('Status:', statusRes.data);

    if (statusRes.data.status === 'active') {
      // Mint
      const mintRes = await axios.post(API_URL, {
        privateKey: AGENT_PRIVATE_KEY
      });
      console.log('Minted:', mintRes.data);
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

mintSBT();
```

### For Claude Agent SDK

```typescript
// In your agent code:
const response = await fetch('https://your-domain.vercel.app/api/mint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    privateKey: process.env.AGENT_PRIVATE_KEY
  })
});

const result = await response.json();
console.log(result);
```

---

## Security Notes

- ⚠️ **NEVER expose your private key publicly**
- ⚠️ Use environment variables to store private keys
- ⚠️ Only use test wallets with small amounts for testing
- ⚠️ The API validates all transactions before execution

---

## Rate Limits

- No rate limits currently (subject to Vercel's limits)
- Each address can only mint once (enforced by smart contract)

---

## Support

- Contract: [View on Explorer](https://rootstock-testnet.blockscout.com/address/CONTRACT_ADDRESS)
- Frontend: https://your-domain.vercel.app
- Issues: Create an issue on GitHub
