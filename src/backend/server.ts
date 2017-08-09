import express = require('express');
import http = require('http');
import io = require('socket.io');
import morgan = require('morgan');
import bodyParser = require('body-parser');

import Player = require('./player');
import Lobby = require('./lobby');
import JoinLobbyPacket from '../common/packets/join-game.packet';
import Packet from '../common/packets/packet';
import Card from '../common/card';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./dist/frontend'));

const httpSocketServer = http.createServer(app);
const socketServer = io(httpSocketServer);

const lobbies: Lobby[] = [];
let currentId = 1; // TODO: Do this better.

app.post('/api/lobby/create', (req, res) => {
  const cards = req.body.cards as Card[];
  lobbies.push(new Lobby(currentId, cards, socketServer));
  res.json({id: currentId++});
});

app.listen(8080, () => {
  httpSocketServer.listen(4000, () => {
    socketServer.on('connection', socket => {
      socket.on('packet', (packet: Packet) => {
        if (packet.name === 'join-lobby') {
          const joinGamePacket = packet as JoinLobbyPacket;
          const lobby = lobbies.find(l => l.id === joinGamePacket.id);
          if (lobby) {
            socket.join(`${lobby.id}`);
            lobby.addPlayer(new Player(socket, joinGamePacket.playerName));
          }
          else {
            // TODO: Send error message back.
          }
        }
      });
    });

    console.log('App running at http://localhost:8080');
  });
});
