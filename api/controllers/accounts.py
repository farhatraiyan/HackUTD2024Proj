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
            abort(500, description='Error: failed to create account.')

class DeleteAccount(Resource):
    def delete(self, id):
        if not id:
            abort(400, description="Invalid input.")
        try:
            account = Account.query.filter_by(id=id).first()
            if account:
                db.session.delete(account)
                db.session.commit()
                return jsonify(account.to_dict())
            return {'message': f'Account not found'}, 404
        except Exception as e:
            db.session.rollback()
            abort(500, description='Error: failed to delete account.')

class ListAccounts(Resource):
    def get(self):
        try:
            accounts = Account.query.all()
            return jsonify([account.to_dict() for account in accounts])
        except Exception as e:
            abort(500, description=str(e))

class UpdateAccount(Resource):
    def put(self, id):
        try:
            account = Account.query.filter_by(id=id).first()

            if not account:
                return {'message': f'Account not found'}, 404

            account_data = request.get_json()

            if not account_data:
                return {'message': 'No input data provided'}, 400

            if 'username' in account_data:
                account.username = account_data['username']
            if 'password' in account_data:
                account.password = account_data['password']

            db.session.commit()
            return jsonify(account.to_dict())
        except Exception as e:
            abort(500, description=str(e))