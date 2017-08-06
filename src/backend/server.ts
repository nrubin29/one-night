import express = require('express');
import http = require('http');
import io = require('socket.io');

import Game = require('./game');
import Player = require("./player");

const app = express();
app.use(express.static('./dist/frontend'));

app.listen(8080, () => {
    const httpSocketServer = http.createServer(app);
    const socketServer = io(httpSocketServer);
    const server = httpSocketServer.listen(4000, () => {
        const game = new Game(1, socketServer);

        socketServer.on('connection', socket => {
            socket.on('join', (data: {id: number, name: string}) => {
                socket.join(`${data.id}`);
                game.addPlayer(new Player(socket, data.name));
            });
        });

        console.log('App running at http://localhost:8080');
    });
});