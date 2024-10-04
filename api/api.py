from flask_restful import Api
from appDB import create_app, db
from controllers.accounts import CreateAccount, ListAccounts

app = create_app()
api = Api(app)

with app.app_context():
    db.create_all()

api.add_resource(CreateAccount, '/accounts')
api.add_resource(ListAccounts, '/accounts')

if __name__ == '__main__':
    app.run(debug=True, port=8101)