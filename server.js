import express from 'express';
import app from './app.js';
import configuration from './config/configuration.js';

export default class Server{
    
    constructor(configuration) {
        this.app = express();
    }
    uncaughtExceptionError() {
        process.on("uncaughtException", err => {
            console.log(`Error: ${err.message}`)
            console.log("Shutting down server due to unhandled promise rejection");
            process.exit(1);
        })
    }
    startServer() {
        const { port } = configuration;
       

        app.post('/completions', async (req, res) => {
            console.log('got a call')
            const options = {
                method:'POST',
                headers: {
                    "Authorization": `Bearer ${process.env.OPEN_AI_SECRET}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model:"gpt-3.5-turbo",
                    messages: [{role: "user", content: req.body.message}],
                    max_tokens: 100,
                })
            }
            try{
                const response = await fetch('https://api.openai.com/v1/chat/completions', options)
                const data = await response.json()
                res.send(data)
            }catch(error){
                console.log(error)
            }
        })
        app.listen(port, () => {
            console.log(`App is running on PORT ${port}`);
        })
    }
    unhandledRejectionError() {
        process.on("unhandledRejection", err => {
            console.log(`Error: ${err.message}`)
            console.log("Shutting down server due to unhandled promise rejection");
            process.exit(1);
        })
    }
}

const server = new Server();
server.uncaughtExceptionError();
server.startServer();
server.unhandledRejectionError();