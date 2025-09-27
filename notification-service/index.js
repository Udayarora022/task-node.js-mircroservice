const amqp = require('amqplib');

async function start(){
        try{
            connection = await amqp.connect('amqp://localhost:5672');
            channel = await connection.createChannel();
            await channel.assertQueue('task_created');
            console.log("Connected to RabbitMQ");

            console.log("Notification Service is listening for messages in task_created queue");
            channel.consume('task_created', function(msg){
                const message = JSON.parse(msg.content.toString());
                console.log("Notification Service received message:", message.title);
                console.log("Notification Service received message:", message);
                channel.ack(msg);
            });

        }catch(err){
            console.log(err);
        }       
}

start();