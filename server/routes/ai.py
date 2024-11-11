from flask import abort, Blueprint, jsonify, request
from controllers.ai import AIModel

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/ai', methods=['POST'])
def generate():
    #request.json is the user input sent from the frontend
    userPrompt = request.json

    #checks if the user input is empty
    if not userPrompt:
        return {'message': f'Invalid input.'}, 400

    #checks for the image parameter in the request
    image_param = request.args.get('image')

    try:
        if image_param:
            response = AIModel.image(userPrompt)
            return jsonify(response)

        response = AIModel.text(userPrompt)
        return jsonify(response)
    
    except Exception as e:
        abort(500, description='Failed to generate AI response.')