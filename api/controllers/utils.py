from flask import request, jsonify, abort
from flask_restful import Resource
from appDB import db


class Status(Resource):
    def get(self):
        return jsonify({'status': 'online'})