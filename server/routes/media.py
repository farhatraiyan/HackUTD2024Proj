from flask import Blueprint, request, jsonify
import requests

media_bp = Blueprint('media', __name__)
service_url = "http://127.0.0.1:8102"

@media_bp.route('/upload', methods=['POST'])
def upload():
    try:
        data = request.json
    
        response = requests.post(
            service_url + "/upload",
            data=data
        )
        
        upload_data = response.json()
        print(upload_data)
        return {"message": "File uploaded successfully"}, response.status_code
    except requests.RequestException as e:
        return {"error": str(e)}, 500

@media_bp.route('/media/<string:media_id>')
def media(media_id):
    try:
        response = requests.get(
            f"{service_url}/media/{media_id}"
        )

        return response.json(), response.status_code
    except requests.RequestException as e:
        return {"error": str(e)}, 500