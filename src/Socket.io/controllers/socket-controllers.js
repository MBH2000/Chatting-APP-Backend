import  {Server} from 'socket.io'

let io;
function init (server) {
    io = new Server(server);
    return io;
}
function getio () {
    if (!io) {
       throw new Error("Can't get io instance before calling .init()");
    }
    return io;
}



const socketController ={
    init,
    getio
}

export default socketController;