import { WebSocketServer } from 'ws';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const server = express().listen(process.env.PORT, () => console.log(`URL ws://localhost:${process.env.PORT}`));
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log('New Connected');
    ws.on('message', function incoming(message) {
        let received = JSON.parse(message)
        console.log(received);
        for (let i = 1; 1 < 3; i++)
            ws.send('you request ' + received);

    });

    ws.on('close', function close() {
        console.log('disconnected');
    });
    //ws.send('something');
});