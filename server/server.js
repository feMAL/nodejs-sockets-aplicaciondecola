const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');
const utils = require('util');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve( __dirname, '../public') ;
const PORT = 5000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./socket.io/socket');

server.listen( PORT, (err) => {

    if (err) throw new Error(err);

    utils.log(`# Servidor escuchando en puerto ${PORT}`);

})