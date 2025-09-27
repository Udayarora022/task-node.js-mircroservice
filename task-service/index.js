const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const amqp = require('amqplib');
const { buffer } = require('stream/consumers');
const port = 3001;

mongoose.connect('mongodb://localhost:27017/userdb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    userId : String,
    createdAt : {type: Date, default: Date.now()}
});

const Task = mongoose.model('Task', taskSchema);

let channel, connection;

async function connectRabbitMQwithRetry(retries = 5, delay = 5000){
    while (retries) {
        try{
            connection = await amqp.connect('amqp://localhost:5672');
            channel = await connection.createChannel();
            await channel.assertQueue('task_created');
            console.log("Connected to RabbitMQ");
            break;

        }catch(err){
            console.log(err);
            retries--;
            console.log(`retries left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
        }       
    }

}


const app = express();
app.use(bodyParser.json());

app.post('/tasks',async function(req,res){
    try{
        const data = req.body;
        const newtask = Task(data);
        const response = await newtask.save();
        const message = {
            taskid : newtask._id,
            title : newtask.title,
            description : newtask.description,
        }
        if(!channel){
            console.log("No channel found");
            return res.status(500).json({error: "No channel found"});
        }
        channel.sendToQueue('task_created',buffer.from(JSON.stringify(message)));
        res.status(201).json(response);
        console.log(response);


    }catch(err){
        res.status(500).json({error: err.message});
        console.log(err);

    }
})
app.get('/tasks', async function(req,res){
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({error: err.message});
    } 
})  


app.listen(port,function(){
    console.log("server running at port 3001");
    connectRabbitMQwithRetry();
});