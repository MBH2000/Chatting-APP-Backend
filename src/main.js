import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import User_Router from './User/routers/user-routers.js';
import cors from 'cors';
import './DataBase/DataBaseController.js'
import socketController from './Socket.io/controllers/socket-controllers.js'
import message from './Socket.io/Messages/Messages-controllers.js';
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT||3000;

socketController.init(server)
const io = socketController.getio();
message(io);

app.use(cors())
app.use(express.json());
app.use(User_Router)

server.listen(PORT, () => {
    console.log('server running at http://localhost:',PORT);
});


