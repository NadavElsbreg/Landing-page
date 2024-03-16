from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = MongoClient("mongodb://localhost:27017/")
db = client["ndvlsb"]
CredentialCollection = db["LogInCredentail"]
LogCollection = db["LogInttempsLog"]
loadsLogCollection = db["logLoads"]


def logLogin(username, ipAddress, status):
    LogCollection.insert_one({"username":username, "ipAddress":ipAddress, "status":status})

def logLoads(ipAddres, agent, browser):
    loadsLogCollection.insert_one({"loadFrom":ipAddres, "agent":agent, "browser":browser})

def perform_login(username, password, ipAddress):
    user = CredentialCollection.find_one({"UserName": username})
    if user:
        if user["password"] == password:
            logLogin(username,ipAddress,"succes")
            return {"username": username, "Name": user["Name"]}
        else:
            logLogin(username,ipAddress,"failed")
            return {"err": "Incorrect password"}
    else:
        logLogin(username,ipAddress,"No such user")
        return {"err": "User not found"}


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    ipAddress = data.get('ipAddress')
    print('login trial - user:', username, 'ip address:', ipAddress)
    return jsonify(perform_login(username, password, ipAddress))

@app.route('/load',methods=['POST'])
def load():
    data =request.json
    ipAddress = data.get("ipAddress")
    agent = data.get("agent")
    browser = data.get("browser")
    print("page loaded in ip address: ", ipAddress, " Browser: ",browser)
    print("aget: ", agent)
    logLoads(ipAddress, agent, browser)
    return jsonify({"status":"logged"})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
