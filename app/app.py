from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory
import os
import uuid

app = Flask(__name__, static_folder='static')
app.secret_key = "documind_secret_key"
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc', 'txt', 'jpg', 'jpeg', 'png'}

# Create uploads directory if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# API endpoint for file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'document' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['document']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Generate a unique filename
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Here you would process the document
        # For now, we'll just return a success message
        return jsonify({
            'success': True,
            'filename': file.filename,
            'message': 'File uploaded successfully'
        })
    
    return jsonify({'error': 'File type not allowed'}), 400

# Serve React App - this will catch all routes and let React handle routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, 'react', path)):
        return send_from_directory(os.path.join(app.static_folder, 'react'), path)
    return send_from_directory(os.path.join(app.static_folder, 'react'), 'index.html')

if __name__ == '__main__':
    app.run(debug=True) 
    # dummy