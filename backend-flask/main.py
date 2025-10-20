from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app,
    supports_credentials=True,
    origins=["http://localhost:3000"],
    methods=["GET", "POST", "OPTIONS"], 
    allow_headers=["Content-Type", "Authorization"])

app.secret_key=os.environ.get("FLASK_SECRET_KEY")

app.config["SESSION_TYPE"] = "filesystem"  # "redis" in production
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # True if using HTTPS in prod
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

client = MongoClient(os.environ.get("DATABASE_URI"))
db = client["users"]
users_collection = db["users_collection"]


@app.route("/authenticate", methods=['POST'])
def authenticate():
    print("in")
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user =  users_collection.find_one({'username': username, 'password': password})
    print(user)
    if user:
        session["user"] = username
        return jsonify({"result": True})
    else:
        return jsonify({'result': False})

if __name__ == "__main__":
    app.run(debug=True, port=5000)