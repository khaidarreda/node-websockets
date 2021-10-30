'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

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
    client.send("Hello from server");
  });
}, 10);
