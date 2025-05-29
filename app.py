from flask import Flask,request, jsonify # type: ignore
from flask_cors import CORS
from dotenv import load_dotenv # type: ignore
load_dotenv()
import os
import google.generativeai as genai # type: ignore

app = Flask(__name__)
CORS(app, origins="*")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat(history=[])

@app.route('/chat', methods=['POST' , 'GET'])
def make_chat():
    user_message = request.json.get("message")
    response=chat.send_message(user_message , stream=False)
    # print(response.text)
    return jsonify({
        "message":response.text,
    })

if __name__ == '__main__':
    app.run(debug=True)