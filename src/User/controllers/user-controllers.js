import User from '../models/user-model.js';
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

async function registerUser(req,res){
    const user = new User(req.body)
    if(req.file)
    {user.profilePic = req.file.buffer}
    try {
        await user.save()
        const token = await user.GenerateToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
}

async function loginUser(req,res){
    try {
        const user = await User.Loginuser(req.body.email,req.body.password)
        const token = await user.GenerateToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
}

const UserController ={
    registerUser,
    loginUser,
    upload
}

export default UserController
