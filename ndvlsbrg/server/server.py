from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import timedelta, datetime
import secrets
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = MongoClient("mongodb://localhost:27017/")
db = client["ndvlsb"]
CredentialCollection = db["LogInCredentail"]
LogCollection = db["LogInttempsLog"]
loadsLogCollection = db["logLoads"]



def generate_random_string(length=16):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(secrets.choice(characters) for i in range(length))
    return random_string

def checkAuthExpiretion(user):
    return datetime.now()<user["authKeyExperation"]

def logLogin(username, ipAddress, status,time, isNotAuthKeyLogIn =True):
    LogCollection.insert_one({"username":username, "ipAddress":ipAddress, "status":status, "time":time, "isAuthKey": not isNotAuthKeyLogIn})
    print("logged login")
    if isNotAuthKeyLogIn:
        newAuthKey = generate_random_string()
        query ={"UserName":username}
        updateKey = {"$set": {"AuthKey": newAuthKey}}
        dateExp =  datetime.strptime((datetime.now().date()+timedelta(days=7)).strftime("%Y-%m-%d"), "%Y-%m-%d")
        updateKeyExp = {"$set": {"authKeyExperation": dateExp}}
        print(dateExp)
        CredentialCollection.update_one(query,updateKey)
        CredentialCollection.update_one(query,updateKeyExp)
        return newAuthKey

def logLoads(ipAddres, agent, browser):
    loadsLogCollection.insert_one({"loadFrom":ipAddres, "agent":agent, "browser":browser, "time":datetime.now()})
    

def perform_login(username="", password="", ipAddress="", authkey=""):
    current_time = datetime.now()
    print("Current time of login:", current_time)
    if authkey != "":
        user = CredentialCollection.find_one({"AuthKey": authkey})
        if checkAuthExpiretion(user):
            logLogin(username,ipAddress,"succes Key auth",current_time, isNotAuthKeyLogIn=False)
            return {"username": username, "Name": user["Name"], "time":current_time}

    user = CredentialCollection.find_one({"UserName": username})
    if user:
        if user["password"] == password:
            authkey = logLogin(username,ipAddress,"succes",current_time)
            return {"username": username, "Name": user["Name"], "time":current_time,"authKey":authkey}
        else:
            logLogin(username,ipAddress,"failed",current_time)
            return {"err": "Incorrect password", "time":current_time}
    else:
        logLogin(username,ipAddress,"No such user",current_time)
        return {"err": "User not found", "time":current_time}


@app.route('/auth',methods=['POST'])
def auth():
    data = request.json
    authKey = data.get("authKey")
    ipAddress = data.get("ipAddress")
    print('login trial - Auth key:', authKey, 'ip address:', ipAddress)
    return jsonify(perform_login(ipAddress=ipAddress,authkey=authKey))


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
