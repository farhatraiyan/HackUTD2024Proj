from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status', methods=['GET'])
def get_data():
    data = {
        'message': 'API is responsive!!'
    }
    return jsonify(data)