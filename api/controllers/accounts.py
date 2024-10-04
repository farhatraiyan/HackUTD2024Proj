from flask import request, jsonify, abort
from flask_restful import Resource
from appDB import db
from models.accounts import Account

class CreateAccount(Resource):
    def post(self):
        account_data = request.json
        if not account_data:
            abort(400, description="Invalid input.")
        try:
            new_account = Account(**account_data)
            db.session.add(new_account)
            db.session.commit()
            return jsonify(new_account.to_dict())
        except Exception as e:
            db.session.rollback()
            abort(500, description=str(e))

class DeleteAccount(Resource):
    def delete(self, username):
        if not username:
            abort(400, description="Invalid input.")
        try:
            account = Account.query.filter_by(username=username).first()
            if account:
                db.session.delete(account)
                db.session.commit()
                return jsonify(account.to_dict())
            print('account not found')
            return {'message': f'Account not found'}, 404
        except Exception as e:
            db.session.rollback()
            abort(500, description=str(e))

class ListAccounts(Resource):
    def get(self):
        try:
            accounts = Account.query.all()
            return jsonify([account.to_dict() for account in accounts])
        except Exception as e:
            abort(500, description=str(e))