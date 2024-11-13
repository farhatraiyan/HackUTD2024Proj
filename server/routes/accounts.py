from flask import abort, Blueprint, jsonify, request
from flask_login import current_user, login_required
from controllers.accounts import Accounts

accounts_bp = Blueprint('accounts', __name__)

@accounts_bp.route('/accounts', methods=['DELETE'])
@login_required
def delete_account():
    try:
        account = Accounts.delete_account(current_user.id)

        if not account:
            return { 'message': 'Failed to delete account' }, 500

        return jsonify(Accounts.to_dict(account))
    except Exception as e:
        abort(500, description='Something went terrible wrong!')

@accounts_bp.route('/accounts', methods=['PUT'])
@login_required
def update_account():
    try:
        account_data = request.json

        account = Accounts.update_account(current_user.id, account_data)

        if not account:
            return { 'message': 'Failed to update account' }, 500

        return jsonify(Accounts.to_dict(account))
    except Exception as e:
        abort(500, description='Something went terrible wrong!')