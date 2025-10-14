#!/bin/bash

# CollabCanvas MVP - Quick Deployment Script
# Run: npm run deploy

echo "🏗️  Building production bundle..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo "🚀 Deploying to Firebase Hosting..."
  npx firebase deploy --only hosting

  if [ $? -eq 0 ]; then
    echo "✅ Deployment complete!"
    echo "📱 Your app is live at:"
    echo "   https://collabcanvas-mvp-53120.web.app"
  else
    echo "❌ Deployment failed. Check errors above."
  fi
else
  echo "❌ Build failed. Fix errors and try again."
fi
