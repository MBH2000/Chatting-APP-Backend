import mongose from 'mongoose'

const messagesSchema = new mongose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    }
})