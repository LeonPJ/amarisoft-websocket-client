import WebSocket from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const ws = new WebSocket(process.env.URL);
const object = { "message": "config_get" };
const data = JSON.stringify(object);

ws.on('open', function open() {
    //ws.send('something');
    ws.send(data);
});

ws.on('message', function incoming(message) {
    console.log(`Server: ${message}`);
});