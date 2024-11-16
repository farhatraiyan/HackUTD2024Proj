from appDB import db
from flask import Blueprint, Response, request
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

@media_bp.route('/image/<string:media_id>')
def media(media_id):
    try:
        image = Images.query.filter_by(id=media_id).first()
        if not image:
            return {"error": "Image not found"}, 404
        print('Image:', image.original_id)

        want_original = request.args.get('original', 'false').lower() == 'true'

        if want_original:
            print('Original Image:', image.original_id)
            media_id = image.original_id
        else:
            media_id = image.preview_id

        response = requests.get(
            f"{service_url}/media/{media_id}",
            stream=True
        )

        if not response.ok:
            return {"error": "Failed to retrieve file"}, response.status_code

        return Response(
            response.iter_content(chunk_size=8192),
            content_type=response.headers['Content-Type'],
            headers=dict(response.headers)
        )
    except requests.RequestException as e:
        return {"error": "Failed to retrieve file"}, 500