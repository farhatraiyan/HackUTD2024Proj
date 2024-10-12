from flask import request, jsonify, abort
from flask_restful import Resource
from appDB import db
from models.accounts import Account

def retrieveAccount(params):
    account = Account.query.filter_by(**params).first()

    if account:
        return account

    return None

class Accounts(Resource):
    def delete(self, id):
        if not id:
            abort(400, description="Invalid input.")

        try:
            account = retrieveAccount({'id': id})

            if account:
                db.session.delete(account)
                db.session.commit()
                return jsonify(account.to_dict())

            return {'message': f'Account not found'}, 404
        except Exception as e:
            db.session.rollback()
            abort(500, description='Failed to delete account.')

    def get(self, id=None, username=None):
        try:
            accounts = None

            if id:
                accounts = retrieveAccount({'id': id})
            elif username:
                accounts = retrieveAccount({'username': username})
            else:
                accounts = Account.query.all()

            if not accounts:
                return {'message': 'No accounts found'}, 404

            if isinstance(accounts, Account):
                return jsonify(accounts.to_dict())

            return jsonify([account.to_dict() for account in accounts])
        except Exception as e:
            abort(500, description='Failed to retrieve accounts.')

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

    def put(self, id):
        try:
            account = retrieveAccount({'id': id})

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
            abort(500, description='Failed to update account.')


class RetrieveAccountById(Resource):
    def get(self, id):
        try:
            account = retrieveAccount({'id': id})

            if account:
                return jsonify(account.to_dict())

            return {'message': f'Account not found'}, 404
        except Exception as e:
            abort(500, description='Failed to retrieve account.')

class RetrieveAccountByUsername(Resource):
    def get(self, username):
        try:
            account = retrieveAccount({'username': username})

            if account:
                return jsonify(account.to_dict())

            return {'message': f'Account not found'}, 404
        except Exception as e:
            abort(500, description='Failed to retrieve account.')