const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const e = require('express');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/userdb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name : string,
    email : string,
});
const User = mongoose.model('User', userSchema);

const app = express();
app.use(bodyParser.json());

app.post('/users',async function(req,res){
    try{
        const data = req.body;
        const newuser = User(data);
        const response = await newuser.save();
        res.status(201).json(response);
        console.log(response);

    }catch(err){
        res.status(500).json({error: err.message});
        console.log(err);

    }
})
app.get('/users', async function(req,res){
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    } 
})  


app.listen(port,function(){
    console.log("server running at port 3000");
});

