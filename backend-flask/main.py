from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask.app()
CORS(app)
client = MongoClient("---------")
db = client["users"]
users_collection = db["users_collection"]


@app.route("/authenticate", methods=['POST'])
def authenticate():
    data = request.get_json()
    

if __name__ == "__main__":
    app.run()