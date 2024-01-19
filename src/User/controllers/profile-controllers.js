import User from "../models/user-model.js";
import multer from "multer";

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

const profileController ={
    editeUser,
    upload
} 

export default profileController