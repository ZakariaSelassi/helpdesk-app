const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require: [true, 'please add a name'],
    },
    email:{
        type:String,
        require:[true,'please add an email']
    },
    password:{
        type:String,
        require:[true,'please add an password']
    },
    isAdmin:{
        type:Boolean,
        require: true,
        default:false
    }
},{
    timestamps:true,
})


module.exports = mongoose.model('User',userSchema)