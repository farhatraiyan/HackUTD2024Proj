from flask import Blueprint, request, jsonify
import requests

media_bp = Blueprint('media', __name__)
service_url = "http://127.0.0.1:8102"

@media_bp.route('/upload', methods=['POST'])
def upload():
    try:
        if 'file' not in request.files:
            return {"error": "No file found"}, 400

        file = request.files['file']

        if file.filename == '':
            return {"error": "No selected file"}, 400

        file_content = file.read()
        file.seek(0)
        files = {'file': (file.filename, file_content, file.content_type)}

        response = requests.post(
            service_url + "/upload",
            files=files
        )
        
        upload_data = response.json()
        print('Upload response:', upload_data)
        return { "message": "Upload successful!" }, response.status_code
    except requests.RequestException as e:
        print('Upload error:', str(e))
        return {"error": "SOMETHING WENT TERRIBLY WRONG"}, 500

@media_bp.route('/media/<string:media_id>')
def media(media_id):
    try:
        response = requests.get(
            f"{service_url}/media/{media_id}"
        )

        return response.json(), response.status_code
    except requests.RequestException as e:
        return {"error": "Failed to retrieve file"}, 500