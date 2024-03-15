const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 
const { error } = require('console');


const app = express();
const PORT = process.env.PORT || 5000;


function porformLogIn(username,password){
    const uri = "mongodb://localhost:27017";
    const dbName = "ndvlsb"; 
    try{
        MongoClient.connect(uri, function(err, client){
            if(err){
                console.log("Error connecting to mongo: ", err);
                return;
            }
            console.log("connected succesfuly");
            const db = client.db(dbName);
            const collection = db.collection('LogInCredentail');
            collection.findone({username:username},function(err,res){
                if(err){
                    console.log("Error occurred while searching for document", err);
                    return {err:"error in the db"};                
                }
                if(res){
                    if(res.password ==password){
                        console.log("succesfull login user: ", username);
                        return {username:username, Name:res.name};
                    }
                }
                else{
                    console.log("unnsecsefull login. no user ",username);
                    return {err:"no such ser"};
                }
            })
    
            client.close(); 
        });  
    }catch{
        console.log("Error connecting to mongo: ", err);
        return{error:err};
    }
    
}

app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log("answered");
    res.json({user:"Nadav",userName:"Nadav!@#123"});
});

app.post('/login2', async (req,res)=>{
    const { username, password, ipAddress} = req.body;
    console.log('login trial - user: '+username+', ip address: '+ipAddress);
    return res.json(porformLogIn(username, password));
    // if(username =="Nadav1234"){
    //     if(password=="N@dav123!@#"){
    //         return res.json({username:"Nadav1234", name:"Nadav Elsberg"});
    //     }
    //     else{
    //         return res.status(401).json({ error: 'Invalid username or password' });
    //     }
    // }
    // else if(username =="Natan88888"){
    //     if(password=="Pa$$w0rd"){
    //         return res.json({username:"Natan88888", name:"Natan Elsberg"});
    //     }
    //     else{
    //         return res.status(401).json({ error: 'Invalid username or password' });
    //     }
    // }
    // else if(username =="ORGGGGGG"){
    //     if(password=="ThisIsIt123"){
    //         return res.json({username:"ORGGGGGG", name:"Or Boreda"});
    //     }
    //     else{
    //         return res.status(401).json({ error: 'Invalid username or password' });
    //     }
    // }
    // else{
    //     return res.status(401).json({ error: 'No such user' });
    // }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  