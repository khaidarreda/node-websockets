'use strict';

const express = require('express');
const { Server } = require('ws');
var bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => {
  res.sendFile(INDEX, { root: __dirname })
});


app.post('/misba7', (req, res) => {
  if(req.body.command == "/allumer"){
     wss.clients.forEach((client) => {
      client.send('on');
     });
  }else if( req.body.command  == "/éteindre"){
      wss.clients.forEach((client) => {
        client.send('off');
      });
  }

  res.send('Got that!');
});


// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send("Hello from server");
//   });
// }, 10);
