from flask import request, jsonify, abort
from flask_restful import Resource

from controllers.ai import AIModel

class ImageModel(Resource):
    def post(self):
        response = AIModel.image(request.json)
        return jsonify(response)