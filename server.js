import { WebSocketServer } from 'ws';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const server = express().listen(process.env.PORT, () => console.log(`URL ws://localhost:${process.env.PORT}`));
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        let received = JSON.parse(message)
        console.log(`Client: ${received.message}`);
        if (received.message == 'config_get')
            ws.send('you request config_get');
    });

    ws.on('close', function close() {
        console.log('disconnected');
    });
    //ws.send('something');
});