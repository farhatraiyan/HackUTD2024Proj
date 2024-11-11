from appDB import create_app, db
from flask import send_from_directory, g, jsonify, request
from flask_restful import Api
from flask_cors import CORS
import os

import controllers.accounts as Accounts
from controllers.utils import Status
from controllers.ai import AIModel

app = create_app()
api = Api(app)
CORS(app)

with app.app_context():
    db.create_all()

def serve_page(page):
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), page)

api.add_resource(Status, '/status')
api.add_resource(AIModel, '/ai')

@app.route('/accounts', methods=['POST'])
def create_account():
    try:
        account_data = request.json

        account = Accounts.create_account(account_data)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@app.route('/accounts/<string:id>', methods=['DELETE'])
def delete_account(id):
    try:
        account = Accounts.delete_account(id)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@app.route('/accounts', methods=['GET'])
def list_accounts():
    try:
        accounts = Accounts.list_accounts(['username'])

        if isinstance(accounts, tuple):
            err, statusCode = accounts
            return { 'message': err }, statusCode

        return jsonify(accounts)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@app.route('/accounts/<string:id>', methods=['GET'])
@Accounts.retrieve_account
def retrieve_account(id):
    return g.account

@app.route('/accounts/<string:id>', methods=['PUT'])
@Accounts.update_account
def update_account(id):
    return g.account

@app.route('/')
def serve_home():
    return serve_page('home.html')

@app.route('/create')
def serve_create_acc():
    return serve_page('create.html')

@app.route('/checkStatus')
def serve_status():
    serve_page('status.html')

@app.route('/about')
def serve_about():
    return serve_page('about.html')

@app.route('/chatbot')
def serve_chatbot():
    return serve_page('chatbot.html')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.root_path, 'dist/assets'), filename)

if __name__ == '__main__':
    app.run(debug=True, port=8101)