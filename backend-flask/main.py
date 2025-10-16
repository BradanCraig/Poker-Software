from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://bcraig:Bradan22@pokersoftware.hgrwrjy.mongodb.net/")
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
        return jsonify({"result": True})
    else:
        return jsonify({'result': False})

if __name__ == "__main__":
    app.run(debug=True, port=5000)