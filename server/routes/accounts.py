from flask import abort, Blueprint, jsonify, request
from controllers.accounts import Accounts

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route('/accounts/<string:id>', methods=['DELETE'])
def delete_account(id):
    try:
        account = Accounts.delete_account(id)

        if not account:
            return { 'message': 'Failed to delete account' }, 500

        return jsonify(Accounts.to_dict(account))
    except Exception as e:
        abort(500, description='Something went terrible wrong!')

@accounts_bp.route('/accounts/<string:id>', methods=['PUT'])
def update_account(id):
    try:
        account_data = request.json

        account = Accounts.update_account(id, account_data)

        if not account:
            return { 'message': 'Failed to update account' }, 500

        return jsonify(Accounts.to_dict(account))
    except Exception as e:
        abort(500, description='Something went terrible wrong!')