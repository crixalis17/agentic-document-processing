# DocuMind - Agentic Document Processing

A modern document processing application with a React frontend and Flask backend.

## Project Structure

- `frontend/`: React TypeScript application
- `app/`: Flask backend application

## Setup and Installation

### Frontend (React)

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   This will run the app in development mode at [http://localhost:3000](http://localhost:3000).

4. Build for production:
   ```
   npm run build
   ```
   
5. Deploy to Flask static folder:
   ```
   ./build-and-deploy.sh
   ```

### Backend (Flask)

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the Flask server:
   ```
   cd app
   python app.py
   ```
   This will run the Flask app at [http://localhost:5000](http://localhost:5000).

## Features

- Modern, responsive UI built with React and TypeScript
- Document upload and processing
- Interactive document type animations
- RESTful API for document processing
- Support for various document formats
