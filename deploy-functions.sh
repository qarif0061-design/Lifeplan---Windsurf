#!/bin/bash

# Firebase Cloud Functions Deployment Script
echo "🚀 Deploying Firebase Cloud Functions..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Deploy functions
echo "📦 Deploying functions..."
firebase deploy --only functions

if [ $? -eq 0 ]; then
    echo "✅ Cloud Functions deployed successfully!"
    echo "🎯 Admin panel is now ready to use at /admin"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
