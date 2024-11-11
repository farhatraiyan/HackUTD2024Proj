from flask import Blueprint, jsonify, request
from controllers.accounts import Accounts

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route('/accounts', methods=['POST'])
def create_account():
    try:
        account_data = request.json

        account = Accounts.create_account(account_data)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@accounts_bp.route('/accounts/<string:id>', methods=['DELETE'])
def delete_account(id):
    try:
        account = Accounts.delete_account(id)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@accounts_bp.route('/accounts', methods=['GET'])
def list_accounts():
    try:
        accounts = Accounts.list_accounts(['username'])

        if isinstance(accounts, tuple):
            err, statusCode = accounts
            return { 'message': err }, statusCode

        return jsonify(accounts)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@accounts_bp.route('/accounts/<string:id>', methods=['GET'])
def retrieve_account(id):
    try:
        account = Accounts.retrieve_account(id)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500

@accounts_bp.route('/accounts/<string:id>', methods=['PUT'])
def update_account(id):
    try:
        account_data = request.json

        account = Accounts.update_account(id, account_data)

        if isinstance(account, tuple):
            err, statusCode = account
            return { 'message': err }, statusCode

        return jsonify(account)
    except Exception as e:
        return { 'message': 'Something went terribly wrong!' }, 500