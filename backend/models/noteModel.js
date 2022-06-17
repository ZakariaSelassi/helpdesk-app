const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const noteSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Ticket'
    },
    text:{
        type:String,
        required:[true,'Please enter some text']
    },
    isStaff:{
        type:Boolean,
        default:false,
    },
    staffed:{
        type:String
    }
    },
{
        timestamps:true,
})

module.exports = mongoose.model('Note',noteSchema)