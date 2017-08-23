import express = require('express');
import http = require('http');
import io = require('socket.io');
import morgan = require('morgan');
import bodyParser = require('body-parser');

import Player = require('./player');
import Lobby = require('./lobby');
import JoinLobbyPacket from '../common/packets/join-game.packet';
import Packet from '../common/packets/packet';
import NamePacket from '../common/packets/name.packet';
import StringPacket from '../common/packets/string.packet';
import GameSettings from '../common/game-settings';
import ErrorPacket from '../common/packets/error.packet';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./dist/frontend'));

const httpSocketServer = http.createServer(app);
const socketServer = io(httpSocketServer);

const lobbies: Lobby[] = [];
let currentId = 1; // TODO: Do this better.

app.post('/api/lobby/create', (req, res) => {
  const settings = req.body.settings as GameSettings;
  lobbies.push(new Lobby(currentId, settings, socketServer));
  res.json({id: currentId++});
});

app.listen(8080, () => {
  httpSocketServer.listen(4000, () => {
    socketServer.on('connection', socket => {
      let lobby: Lobby;

      socket.on('packet', (packet: Packet) => {
        if (packet.name === 'join-lobby') {
          lobby = lobbies.find(l => l.id === (packet as JoinLobbyPacket).id);

          if (lobby) {
            socket.emit('packet', new StringPacket('connect'));
          }

          else {
            socket.emit('packet', new ErrorPacket(`No lobby with ID ${(packet as JoinLobbyPacket).id}.`));
          }
        }

        else if (packet.name === 'name') {
          if (lobby) {
            socket.join(`${lobby.id}`);
            lobby.addPlayer(new Player(socket, (packet as NamePacket).playerName));
          }

          else {
            socket.emit('packet', new ErrorPacket(`Attempted to provide name without joining lobby first.`));
          }
        }
      });
    });

    console.log('App running at http://localhost:8080');
  });
});
