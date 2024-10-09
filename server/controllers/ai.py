from flask import request, jsonify, abort
from flask_restful import Resource
from appDB import db
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from langchain.memory import ChatMessageHistory
import os

#the api key is in the .env file
load_dotenv(find_dotenv())
#llm = OpenAI(
#    api_key = os.environ.get('OPENAI_API_KEY'),
#    temperature=0)
history = ChatMessageHistory()

class AIModel(Resource):
    def post(self):
        #request.json is the user input sent from the frontend
        userPrompt = request.json
        

        #replace request.json with the ai's response
        response = {"role":"ai", "content": request.json}
        
        return jsonify(response)
    
#adds messages to the history
    def update_history(ai_response, user_input):
        if len(history.messages) > 20:
            history.messages = history.messages[-20:]
            history.add_user_message(user_input)
            history.add_ai_message(ai_response)

#construnts histoy and forms history of the chat
    def construct_history_str():
        hist_str = ''.join(f"{m.type}: {m.content}\n" for m in history.messages)
        return hist_str