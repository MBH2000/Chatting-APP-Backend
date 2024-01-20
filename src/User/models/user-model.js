import mongoose from'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is envalide')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:12
    },
    profilePic:{
        type:Buffer,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    friends:{
        type:Array,
        default:[]
    },
    token:{
        type:String,
    }
})

UserSchema.methods.GenerateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismyredemptionproject')
    user.token = token
    await user.save()
    return token
}

UserSchema.statics.Loginuser = async function(email,password){
const user = await User.findOne({email})
if(!email){
    throw new Error('Unable to Login')
}
const isMatch = await bcrypt.compare( password , user.password)
if(!isMatch){
    throw new Error('Unable to Login')
}
return user
}

UserSchema.pre('save',async function (next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

UserSchema.methods.toJSON =  function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token

    return userObject
}

const User = mongoose.model("User", UserSchema);
export default User;
