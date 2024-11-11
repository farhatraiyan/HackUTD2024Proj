from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from langchain.memory import ChatMessageHistory

#the api key is in the .env file
load_dotenv(find_dotenv())

client = OpenAI()
history = ChatMessageHistory()

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

class AIModel():
    def text(userPrompt):
        #using these for testing, ignore them
        #--a={"role":"ai", "content": "asdf"}
        #--return jsonify(a)

        hist = construct_history_str()
        
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Don't talk so much."},
                {"role": "user", "content": hist + userPrompt}
            ]
        )
        
        #this returns only the AI's response
        ai = completion.choices[0].message.content
        update_history(ai, userPrompt)  

        #replace request.json with the ai's response
        response = {"role":"ai", "content": ai}
        
        return response
    
    def image(userPrompt):
        #using these for testing, ignore them
        #--a={"role":"ai", "content": "asdf"}
        #--return jsonify(a)

        hist = construct_history_str()

        #checks if the prompt has the word image in it to determine whether to create image or not.
        image = client.images.generate(
            model="dall-e-2",
            prompt = hist + userPrompt,
            n=1,
            size="256x256"
        )
        ai = image.data[0].url
        #having the image url in the history was taking too many tokens
        update_history("Assume you sent an image of what the user requested", userPrompt)

        #replace request.json with the ai's response
        response = {"role":"ai", "content": ai}
        
        return response