function message(io){
    io.on('connection',(socket)=>{
        console.log('connected with id',socket.id);
        socket.on('disconnect',()=>{
            console.log('bye');
        })
        socket.on('message',(message)=>{
            socket.broadcast.emit ('message',message)
        })
        socket.on('join',(room)=>{
          socket.join(room)
          io.to(room).emit('message','joined')
          socket.on('roommessage',(message)=>{
            io.to(room).emit('message',message)
          })
        })
      })
}

export default message
