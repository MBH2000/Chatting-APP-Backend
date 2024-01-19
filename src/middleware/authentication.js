import jwt from 'jsonwebtoken'
import User from '../User/models/user-model.js'

async function verifytoken(req,res,next){
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'thisismyredemptionproject')
        const user = await User.findOne({_id:decoded._id,token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error:'UnAuthorized'})
    }
}

export default verifytoken