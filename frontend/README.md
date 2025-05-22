# DocuMind - React Frontend

This is the React frontend for the DocuMind application, an agentic document processing system.

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```
   This will run the app in development mode at [http://localhost:3000](http://localhost:3000).

3. Build for production:
   ```
   npm run build
   ```
   This builds the app for production to the `build` folder.

## Backend Integration

The React app is configured to proxy API requests to a Flask backend running on port 5000. Make sure the Flask backend is running before using the file upload functionality.

To start the Flask backend:

```
cd ../app
python app.py
```

## Features

- Modern, responsive UI built with React and TypeScript
- Document upload and processing
- Interactive document type animations
- Seamless integration with Flask backend
