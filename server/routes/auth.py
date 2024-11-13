from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from controllers.accounts import Accounts

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
    
        user = Accounts.retrieve_account(data['username'])

        if user and user.password == data['password']:
            login_user(user)
            return jsonify({'message': 'Logged in successfully'})
        
        return {'message': 'Invalid username or password'}, 401
    
    except Exception as e:
        return {'message': 'Failed to log in'}, 500

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json

        user = Accounts.retrieve_account(data['username'])

        if user:
            if user.password == data['password']:
                return {'message': 'You are already signed up'}, 409

            return {'message': 'Username already taken'}, 401

        new_user = Accounts.create_account(data)
        login_user(new_user)

        return jsonify({'message': 'Signed up successfully'})
    except Exception as e:
        return {'message': 'Failed to sign up'}, 500