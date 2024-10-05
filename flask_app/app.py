from flask import Flask, render_template
from flask_restful import Api
from appDB import create_app, db
from controllers.accounts import CreateAccount, DeleteAccount, ListAccounts, RetrieveAccountById, RetrieveAccountByUsername, UpdateAccount

app = create_app()
api = Api(app)

with app.app_context():
    db.create_all()

api.add_resource(CreateAccount, '/accounts')
api.add_resource(DeleteAccount, '/accounts/<int:id>')
api.add_resource(ListAccounts, '/accounts')
api.add_resource(RetrieveAccountById, '/accounts/<int:id>')
api.add_resource(RetrieveAccountByUsername, '/accounts/<string:username>')
api.add_resource(UpdateAccount, '/accounts/<int:id>')

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/status')
def status():
    return render_template('status.html')

if __name__ == '__main__':
    app.run(debug=True, port=8101)