'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

server.post('/', (req, res) => {
  let text = req.body.text;
  // implement your bot here ...
  res.sendFile(INDEX, { root: __dirname })
});


const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

server.post('/misba7', (req, res) => {
  let text = req.body.text;
  // implement your bot here ...
  res.send(text);
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
