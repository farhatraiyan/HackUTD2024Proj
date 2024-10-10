from dotenv import load_dotenv
from flask import request, jsonify, abort
from flask_restful import Resource
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

prompt = "Say hi"

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say hi",
        }
    ],
    model="gpt-4o-mini",
)

print(chat_completion.choices[0].message.content)