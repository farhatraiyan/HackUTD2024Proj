from appDB import db
from models.accounts import Account

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

class Accounts():
    def create_account(account_data):
        if not account_data:
            raise Exception('Poor request.')

        try:
            new_account = Account(**account_data)
            db.session.add(new_account)
            db.session.commit()

            return new_account
        except Exception as e:
            db.session.rollback()

            if 'UNIQUE constraint failed' in str(e):
                return None

            raise e

    def delete_account(id):
        if not id:
            raise Exception('Poor request.')

        try:
            account = retrieveAccount({'id': id})

            if not account:
                return None

            db.session.delete(account)
            db.session.commit()

            return account
        except Exception as e:
            db.session.rollback()
            raise e

    def list_accounts(fields):
        if fields is None or not isinstance(fields, list):
            raise Exception('Poor request.')

        fields = get_fields(fields)

        accounts = Account.query.with_entities(*fields).all()

        if not accounts:
            return None

        # Note: Probably not the best way to do this
        column_names = [field.key for field in fields]
        
        result = [
            {name: getattr(account, name) for name in column_names}
            for account in accounts
        ]

        return result

    def retrieve_account(id):
        account = None

        if len(id) != 36:
            account = retrieveAccount({'username': id})
        else:
            account = retrieveAccount({'id': id})

        return account

    def update_account(id, account_data):
        if not id or not account_data:
            raise Exception('Poor request.')
        
        try:
            account = retrieveAccount({'id': id})

            if not account:
                return None

            if 'username' in account_data:
                account.username = account_data['username']

            if 'password' in account_data:
                account.password = account_data['password']

            db.session.commit()

            return account
        except Exception as e:
            db.session.rollback()
            raise e
    
    def to_dict(account):
        if not isinstance(account, Account):
            return None

        return account.to_dict()