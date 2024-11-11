from appDB import db
from models.accounts import Account

from flask import request, jsonify, abort, g
from decorator import decorator

def retrieveAccount(params):
    account = Account.query.filter_by(**params).first()

    if account:
        return account

    return None

def get_fields(fields):
    return_list = []

    if 'username' in fields:
        return_list.append(Account.username)
    
    if 'id' in fields:
        return_list.append(Account.id)
    
    return return_list

def create_account(account_data):
        if not account_data:
            return 'Poor request.', 400

        try:
            new_account = Account(**account_data)
            db.session.add(new_account)
            db.session.commit()
            return new_account.to_dict()

        except Exception as e:
            db.session.rollback()

            if 'UNIQUE constraint failed' in str(e):
                return 'Error: conflict.', 409

            return 'Failed to create account.', 500

@decorator
def delete_account(f, id):
    if not id:
        return {'message': f'Poor request'}, 400

    try:
        account = retrieveAccount({'id': id})

        if not account:
            return {'message': f'Account not found'}, 404

        db.session.delete(account)
        db.session.commit()
        g.account = jsonify(account.to_dict())
        return f(id)

    except Exception as e:
        db.session.rollback()
        abort(500, description='Failed to delete account.')

def list_accounts(fields):
    if fields is None or not isinstance(fields, list):
        return 'Poor request.', 400

    fields = get_fields(fields)

    accounts = Account.query.with_entities(*fields).all()

    if not accounts:
        return 'No account found.', 404

    # Note: Probably not the best way to do this
    column_names = [field.key for field in fields]
    
    result = [
        {name: getattr(account, name) for name in column_names}
        for account in accounts
    ]

    return result

@decorator
def retrieve_account(f, id):
    account = None

    if len(id) != 36:
        account = retrieveAccount({'username': id})
    else:
        account = retrieveAccount({'id': id})

    if not account:
        return {'message': f'Account not found'}, 404

    g.account = jsonify(account.to_dict())
    return f(id)

@decorator
def update_account(f, id):
        if not id:
            return {'message': f'Poor request.'}, 400

        account_data = request.get_json()

        if not account_data:
            return {'message': f'Invalid input.'}, 400

        try:
            account = retrieveAccount({'id': id})

            if not account:
                return {'message': f'Account not found'}, 404

            if 'username' in account_data:
                account.username = account_data['username']

            if 'password' in account_data:
                account.password = account_data['password']

            db.session.commit()
            g.account = jsonify(account.to_dict())
            return f(id)

        except Exception as e:
            db.session.rollback()

            if 'UNIQUE constraint failed' in str(e):
                return {'message': f'Error: conflict.'}, 409

            abort(500, description='Failed to update account.')