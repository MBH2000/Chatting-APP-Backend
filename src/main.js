import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import User_Router from './User/routers/user-routers.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.DB_URL) .then(() => console.log('Connected!'));

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const PORT = process.env.PORT||3000;

app.use(cors())
app.use(express.json());
app.use(User_Router)

server.listen(PORT, () => {
    console.log('server running at http://localhost:',PORT);
});