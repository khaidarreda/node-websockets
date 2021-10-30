'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));




const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => {
  res.sendFile(INDEX, { root: __dirname })
});


app.post('/misba7', (req, res) => {
  res.send('Got that!');
});


setInterval(() => {
  wss.clients.forEach((client) => {
    client.send("Hello from server");
  });
}, 10);
