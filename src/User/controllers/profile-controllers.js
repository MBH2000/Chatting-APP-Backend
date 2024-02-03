import multer from 'multer';
import User from "../models/user-model.js"

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

async function editeUser(req,res){
    const update = Object.keys(req.body)
    console.log(update);
    const allowedUpdates = ['name','email','password','profilePic']
    const isValid = update.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({error:'Invalid updates'})
    }

    if(req.file){
        req.user.profilePic = req.file.buffer;
    }

    try {
        update.forEach((update) => {req.user[update] = req.body[update];});
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
}

async function profile(req,res){
    res.send(req.user)
}

async function getFriends(req,res){
    try {
        const friends = await User.find({_id:{ $in: req.user.friends}})
        const result = friends.map(item => ({ id: item._id, name: item.name, profilePic: item.profilePic }));
        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}

const profileController ={
    editeUser,
    upload,
    profile,
    getFriends
} 
 
export default profileController