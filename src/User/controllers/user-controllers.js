import User from '../models/user-model.js';
import cloudinaryController from '../../utils/cloudinary.js';

async function registerUser(req,res){
    const user = new User(req.body)
    if(req.file)
    {   
        const imageName = new Date().getTime().toString()
        const uploadResult = await cloudinaryController.uploadImage(req.file.buffer,imageName)
        const uploadedUrl = uploadResult.url
        user.profilePic=uploadedUrl
    }

    try {
        await user.save()
        const token = await user.GenerateToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
}

async function loginUser(req, res) {
    try {
        const user = await User.Loginuser(req.body.email, req.body.password);
        const token = await user.GenerateToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function logout(req,res) {
    try {
        const user = await User.findById(req.user._id)
        user.token = null
        await user.save()
        res.status(200).send({message:'Logout successful'})
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const UserController ={
    registerUser,
    loginUser,
    logout
}

export default UserController
