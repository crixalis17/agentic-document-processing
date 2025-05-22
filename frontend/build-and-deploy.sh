#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Create a directory for the React build in the Flask app's static folder
echo "Creating directory for React build in Flask app's static folder..."
mkdir -p ../app/static/react

# Copy the build files to the Flask app's static folder
echo "Copying build files to Flask app's static folder..."
cp -r build/* ../app/static/react/

echo "Done! The React app has been built and deployed to the Flask app's static folder." 