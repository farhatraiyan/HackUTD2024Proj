from appDB import db
from flask import Blueprint, request
from models.images import Images
import requests

media_bp = Blueprint('media', __name__)
service_url = "http://127.0.0.1:8102"

def upload_file(files):
    response = requests.post(
        service_url + "/media",
        files=files
    )

    if not response.ok:
        return {"error": "Failed to upload file"}, response.status_code
    
    upload_data = response.json()
    cid = upload_data.get('cid')
    print('Upload response:', cid)
    return cid

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

        original_id = upload_file(files)
        preview_id = upload_file(files)

        new_image = Images(original_id, preview_id)
        db.session.add(new_image)
        db.session.commit()
        print(new_image.to_dict())

        return { "message": "Upload successful!" }
    except requests.RequestException as e:
        db.session.rollback()

        print('Upload error:', str(e))
        return {"error": "SOMETHING WENT TERRIBLY WRONG"}, 500

@media_bp.route('/media/<string:media_id>')
def media(media_id):
    try:
        image = Images.query.filter_by(id=media_id).first()
        print('Image:', image.original_id, image.preview_id)

        file_id = image.original_id

        response = requests.get(
            f"{service_url}/media/{file_id}",
            stream=True
        )

        if not response.ok:
            return {"error": "Failed to retrieve file"}, response.status_code

        headers = {
            'Content-Type': response.headers.get('Content-Type'),
            'Content-Disposition': response.headers.get('Content-Disposition'),
            'Content-Length': response.headers.get('Content-Length')
        }
        
        return response.content, response.status_code, headers
    except requests.RequestException as e:
        return {"error": "Failed to retrieve file"}, 500