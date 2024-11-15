from flask_login import LoginManager
from controllers.accounts import Accounts

login_manager = LoginManager()

def init_login(app):
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    
    @login_manager.user_loader
    def load_user(user_id):
        return Accounts.retrieve_account(user_id)
    
    return login_manager