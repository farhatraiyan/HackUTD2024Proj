from appDB import create_app, db
from flask_restful import Api
from flask_cors import CORS
import os

from controllers.utils import Status
from controllers.ai import AIModel

from routes.accounts import accounts_bp
from routes.pages import pages_bp

app = create_app()
api = Api(app)
CORS(app)

with app.app_context():
    db.create_all()

api.add_resource(Status, '/status')
api.add_resource(AIModel, '/ai')

app.register_blueprint(accounts_bp)
app.register_blueprint(pages_bp)

if __name__ == '__main__':
    app.run(debug=True, port=8101)