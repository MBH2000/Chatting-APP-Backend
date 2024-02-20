import jwt from 'jsonwebtoken'
import User from '../User/models/user-model.js'

function verifytoken (io){
    io.use((socket, next) => {
      const token = socket.handshake.headers.authorization;
      if (token) {
        jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
          if(err){
            next(new Error("invalide Token"))
          }else {
            const user = await User.findOne({_id:decoded._id,token})
            if( err||!user){
                next( new Error("no user found")) 
            }else{
              socket.user = user
              next()
            }
          }
        }) 
      } else {
        next(new Error("no token"));

      }
      });
  }
  export default verifytoken