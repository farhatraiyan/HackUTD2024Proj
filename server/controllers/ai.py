from flask import request, jsonify, abort
from flask_restful import Resource
from appDB import db
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from langchain.memory import ChatMessageHistory
import os

#the api key is in the .env file
load_dotenv(find_dotenv())

client = OpenAI()
history = ChatMessageHistory()

class AIModel(Resource):
    def post(self):
        #using these for testing, ignore them
        #--a={"role":"ai", "content": "asdf"}
        #--return jsonify(a)

        #request.json is the user input sent from the frontend
        userPrompt = request.json
        hist = AIModel.construct_history_str()

        #invokes openai with the history, and the user prompt attatched
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": hist + userPrompt}]
            )
        
        #this returns only the AI's response
        ai = (completion.choices[0].message.content)

        AIModel.update_history(ai, userPrompt)

        #replace request.json with the ai's response
        response = {"role":"ai", "content": ai}
        
        return jsonify(response)
    
#Adds messages to the history
    def update_history(ai_response, user_input):
        if len(history.messages) > 20:
            #if the history's length is more than 20, it removes the first 2 elements; done to save tokens
            history.messages = history.messages[2:]
        history.add_user_message(user_input)
        history.add_ai_message(ai_response)


#Constructs history of the chat into a String
    def construct_history_str():
        hist_str = ''.join(f"{m.type}: {m.content}\n" for m in history.messages)
        return hist_str