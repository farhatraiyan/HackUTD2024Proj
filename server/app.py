# Import DB and DB initializer
from appDB import create_app, db

# Import Flask CORS to handle Frontend requests
from flask_cors import CORS

# Import Blueprints (app routes are defined within these)
from routes.accounts import accounts_bp
from routes.ai import ai_bp
from routes.pages import pages_bp

# Initialize Flask app, API, and CORS, DB
app = create_app()
CORS(app)

# Create DB tables if they don't exist
with app.app_context():
    db.create_all()

# Register route Blueprints
app.register_blueprint(accounts_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(pages_bp)

# Run the app on port 8101
if __name__ == '__main__':
    app.run(debug=True, port=8101)