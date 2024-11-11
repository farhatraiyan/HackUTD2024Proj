# Import DB and DB initializer
from appDB import create_app, db

# Import Flask API for AI stuff (probably will remove soon)
from flask_restful import Api
# Import Flask CORS to handle Frontend requests
from flask_cors import CORS

# Import AIModel
from controllers.ai import AIModel

# Import Blueprints (app routes are defined within these)
from routes.accounts import accounts_bp
from routes.pages import pages_bp

# Initialize Flask app, API, and CORS, DB
app = create_app()
api = Api(app)
CORS(app)

# Create DB tables if they don't exist
with app.app_context():
    db.create_all()

# Add AIModel to API (probably will remove soon)
api.add_resource(AIModel, '/ai')

# Register route Blueprints
app.register_blueprint(accounts_bp)
app.register_blueprint(pages_bp)

# Run the app on port 8101
if __name__ == '__main__':
    app.run(debug=True, port=8101)