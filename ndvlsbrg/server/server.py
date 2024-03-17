from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = MongoClient("mongodb://localhost:27017/")
db = client["ndvlsb"]
CredentialCollection = db["LogInCredentail"]
LogCollection = db["LogInttempsLog"]
loadsLogCollection = db["logLoads"]


def logLogin(username, ipAddress, status,time):
    LogCollection.insert_one({"username":username, "ipAddress":ipAddress, "status":status, "time":time})

def logLoads(ipAddres, agent, browser):
    loadsLogCollection.insert_one({"loadFrom":ipAddres, "agent":agent, "browser":browser})

def perform_login(username, password, ipAddress):
    current_time = datetime.datetime.now()
    print("Current time of login:", current_time)
    user = CredentialCollection.find_one({"UserName": username})
    if user:
        if user["password"] == password:
            logLogin(username,ipAddress,"succes",current_time)
            return {"username": username, "Name": user["Name"], "time":current_time}
        else:
            logLogin(username,ipAddress,"failed",current_time)
            return {"err": "Incorrect password", "time":current_time}
    else:
        logLogin(username,ipAddress,"No such user",current_time)
        return {"err": "User not found", "time":current_time}


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
    browser = {"browserType":data.get("browserType"),
               "version":data.get("version"),
               "Ismobile":data.get("Ismobile"),}
    print("page loaded in ip address: ", ipAddress, " Browser: ",browser)
    print("aget: ", agent)
    logLoads(ipAddress, agent, browser)
    return jsonify({"status":"logged"})



if __name__ == '__main__':    
    print("Server is ruuning on port 5000")
    app.run(host='0.0.0.0', port=5000)
