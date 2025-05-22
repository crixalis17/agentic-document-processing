#!/bin/bash

# Exit on error
set -e

echo "Building React application..."
cd frontend
npm run build

echo "Deploying to Flask static directory..."
mkdir -p ../app/static/react
rm -rf ../app/static/react/*
cp -r build/* ../app/static/react/

echo "Build and deploy completed successfully!"
echo "Start the Flask server with: cd app && python app.py" 