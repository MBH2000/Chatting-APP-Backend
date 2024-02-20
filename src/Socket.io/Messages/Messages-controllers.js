import verifytoken from '../../middleware/verfietoken.js'
import dotenv from 'dotenv'


dotenv.config()


 function message  (io){
    verifytoken(io)
    io.on('connection',(socket)=>{
      console.log('connected with id',socket.id);
      socket.on('disconnect',()=>{
          console.log('bye');
      })
      socket.on('message',(message)=>{
          socket.broadcast.emit ('message',{message :message})
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
