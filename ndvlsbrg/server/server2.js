const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 

const port = 5000;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log("answered");
    res.json({user:"Nadav",userName:"Nadav!@#123"});
});

app.post('/login2', async (req,res)=>{
    const { username, password, ipAddress} = req.body;
    console.log('login tria - user: '+username+', ip address: '+ipAddress)
    if(username =="Nadav1234"){
        if(password=="N@dav123!@#"){
            return res.json({username:"Nadav1234", name:"Nadav Elsberg"});
        }
        else{
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    }
    else if(username =="Natan88888"){
        if(password=="Pa$$w0rd"){
            return res.json({username:"Natan88888", name:"Natan Elsberg"});
        }
        else{
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    }
    else if(username =="ORGGGGGG"){
        if(password=="ThisIsIt123"){
            return res.json({username:"ORGGGGGG", name:"Or Boreda"});
        }
        else{
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    }
    else{
        return res.status(401).json({ error: 'No such user' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  