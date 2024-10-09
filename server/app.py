from flask import send_from_directory
from flask_restful import Api
from appDB import create_app, db
from controllers.accounts import CreateAccount, DeleteAccount, ListAccounts, RetrieveAccountById, RetrieveAccountByUsername, UpdateAccount
from controllers.utils import Status
from flask_cors import CORS
import os

app = create_app()
api = Api(app)
CORS(app)

with app.app_context():
    db.create_all()

api.add_resource(CreateAccount, '/accounts')
api.add_resource(DeleteAccount, '/accounts/<int:id>')
api.add_resource(ListAccounts, '/accounts')
api.add_resource(RetrieveAccountById, '/accounts/<int:id>')
api.add_resource(RetrieveAccountByUsername, '/accounts/<string:username>')
api.add_resource(UpdateAccount, '/accounts/<int:id>')

api.add_resource(Status, '/status')

@app.route('/')
def serve_home():
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), 'home.html')

@app.route('/create/')
def serve_create_acc():
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), 'create.html')

@app.route('/status/')
def serve_status():
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), 'status.html')

@app.route('/about/')
def serve_about():
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), 'about.html')

@app.route('/chatbot/')
def serve_chatbot():
    return send_from_directory(os.path.join(app.root_path, 'dist/views'), 'chatbot.html')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.root_path, 'dist/assets'), filename)

if __name__ == '__main__':
    app.run(debug=True, port=8101)