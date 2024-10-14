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
        
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Don't talk so much."},
                {"role": "user", "content": hist + userPrompt}]
            )
        
        #this returns only the AI's response
        ai = completion.choices[0].message.content
        AIModel.update_history(ai, userPrompt)  

        #replace request.json with the ai's response
        response = {"role":"ai", "content": ai}
        
        return jsonify(response)
    
    def image(prompt):
        #using these for testing, ignore them
        #--a={"role":"ai", "content": "asdf"}
        #--return jsonify(a)

        hist = AIModel.construct_history_str()
        #request.json is the user input sent from the frontend
        userPrompt = prompt        

        #checks if the prompt has the word image in it to determine whether to create image or not.
        image = client.images.generate(
        prompt = hist + userPrompt,
        n=1,
        size="256x256"
        )
        ai = image.data[0].url
        #having the image url in the history was taking too many tokens
        AIModel.update_history("Assume you sent an image of what the user requested", userPrompt)

        #replace request.json with the ai's response
        response = {"role":"ai", "content": ai}
        
        return response
    
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