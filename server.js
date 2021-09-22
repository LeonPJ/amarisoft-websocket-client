import { WebSocketServer } from 'ws';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const server = express().listen(process.env.PORT, () => console.log(`URL ws://localhost:${process.env.PORT}`));
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    console.log('Client Connect');
    ws.on('message', function incoming(message) {
        let received = JSON.parse(message)

        ws.send('you request ' + JSON.stringify(received));
        console.log(received);
    });

    ws.on('close', function close() {
        console.log('Client Disconnect');
    });
});