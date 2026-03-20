#!/bin/bash

# Load Vercel configuration
if [ -f .env.vercel ]; then
  export $(cat .env.vercel | grep -v '^#' | xargs)
else
  echo "❌ Error: .env.vercel not found"
  exit 1
fi

echo "🚀 Triggering Vercel deployment for rootstock-3000-sbt..."
echo ""

# Get latest deployment to check status
echo "📊 Checking latest deployment status..."
DEPLOYMENT_INFO=$(curl -s -X GET \
  "https://api.vercel.com/v6/deployments?projectId=$PROJECT_ID&limit=1" \
  -H "Authorization: Bearer $VERCEL_TOKEN")

echo "$DEPLOYMENT_INFO" | jq '.'

echo ""
echo "🔄 Creating new deployment..."

# Trigger new deployment using deployments hook
DEPLOY_RESPONSE=$(curl -s -X POST \
  "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "rootstock-3000-sbt",
    "gitSource": {
      "type": "github",
      "ref": "main",
      "repoId": 1174715154
    }
  }')

echo "$DEPLOY_RESPONSE" | jq '.'

echo ""
echo "✅ Deployment triggered! Check status at:"
echo "https://vercel.com/heddaaibot-3797s-projects/rootstock-3000-sbt"
