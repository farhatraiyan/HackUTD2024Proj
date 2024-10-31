from appDB import create_app, db
from flask import send_from_directory, g
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
@Accounts.create_account
def create_account():
    return g.account

@app.route('/accounts/<string:id>', methods=['DELETE'])
@Accounts.delete_account
def delete_account(id):
    return g.account

@app.route('/accounts', methods=['GET'])
@Accounts.list_accounts
def list_accounts():
    return g.accounts

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