# Import DB and DB initializer
from appDB import create_app, db

# Import login manager
from auth_manager import init_login

# Import Flask CORS to handle Frontend dev requests
from flask_cors import CORS

# Import Blueprints (app routes are defined within these)
from routes.accounts import accounts_bp
from routes.ai import ai_bp
from routes.auth import auth_bp
from routes.pages import pages_bp

# Initialize Flask app, DB
app = create_app()
init_login(app)
app.config['SECRET_KEY'] = 'your-secret-key'
CORS(app) # Heavily rethink this in production; this is a security risk; only for frontend dev

# Create DB tables if they don't exist
with app.app_context():
    db.drop_all()
    db.create_all()

# Register route Blueprints
app.register_blueprint(accounts_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(pages_bp)
app.register_blueprint(auth_bp)

# Run the app on port 8101
if __name__ == '__main__':
    app.run(debug=True, port=8101)