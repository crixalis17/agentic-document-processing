from flask import Flask, render_template, request, redirect, url_for, flash
import os
import uuid

app = Flask(__name__)
app.secret_key = "documind_secret_key"
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc', 'txt', 'jpg', 'jpeg', 'png'}

# Create uploads directory if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'document' not in request.files:
        flash('No file part')
        return redirect(request.url)
    
    file = request.files['document']
    
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    
    if file and allowed_file(file.filename):
        # Generate a unique filename
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Here you would process the document
        # For now, we'll just return a success message
        return render_template('success.html', filename=file.filename)
    
    flash('File type not allowed')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True) 
    # dummy