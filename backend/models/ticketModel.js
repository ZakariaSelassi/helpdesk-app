const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const ticketSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    product:{
        type:String,
        required:[true,'Please select a product'],
        enum: ['iPhone','Playstation 5', 'HeadPhone Bose']
    },
    description: {
        type:String,
        required:[true,'Please enter a description of the products']
    },
    status:{
        type:String,
        required:true,
        enum:['new', "in process", 'closed'],
        default:'new'
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('Ticket',ticketSchema)