from flask import Blueprint, send_from_directory
from pathlib import Path
import os

pages_bp = Blueprint('pages', __name__)

def serve_page(page):
    current_dir = Path(__file__).parent.parent
    return send_from_directory(os.path.join(current_dir, 'dist/views'), page)

@pages_bp.route('/')
def serve_home():
    return serve_page('home.html')

@pages_bp.route('/create')
def serve_create_acc():
    return serve_page('create.html')

@pages_bp.route('/checkStatus')
def serve_status():
    return serve_page('status.html')

@pages_bp.route('/about')
def serve_about():
    return serve_page('about.html')

@pages_bp.route('/chatbot')
def serve_chatbot():
    return serve_page('chatbot.html')

@pages_bp.route('/signin')
def serve_signIn():
    return serve_page('signin.html')

@pages_bp.route('/user')
def serve_userPage():
    return serve_page('user.html')
@pages_bp.route('/upload')
def serve_upload():
    return serve_page('upload.html')

@pages_bp.route('/media')
def serve_media():
    return serve_page('media.html')

@pages_bp.route('/assets/<path:filename>')
def serve_assets(filename):
    current_dir = Path(__file__).parent.parent
    return send_from_directory(os.path.join(current_dir, 'dist/assets'), filename)