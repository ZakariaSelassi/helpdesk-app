const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const { restart } = require('nodemon')
const res = require('express/lib/response')
const req = require('express/lib/request')


// @desc    Get user tickets
// @route   GET /api/tickets
// @access  private

const getUserTickets = asyncHandler(async (req,res) => {
    
    // Step 1 : Get user id
    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error('User not found')
    }
    // STEP 2 : get all tickets existing for that user
    const tickets = await Ticket.find({user: req.user.id})

    // STEP 3 : return json response with tickets

    res.status(200).json(tickets)
})


// @desc    create ticket
// @route  POST /api/tickets
// @access  private

const createUserTickets = asyncHandler(async (req,res) => {

    const {product,description} = req.body
    // STEP 1 : Check if user entry are empty 
    if(!product || !description){
        res.status(400)
        throw new Error('Please include all field');
    }

    // STEP 2 : Get user id
      const userID = await User.findById(req.user.id)
      if(!userID){
          res.status(401)
          throw new Error('User not found')
      }

    // STEP 3 : create ticket
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id, 
        status : 'new'
    })

    res.status(200).json(ticket)
})

// @desc    get single ticket
// @route  GET /api/tickets/:id
// @access  private
const getUserSingleTicket = asyncHandler (async (req,res) => {

    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }

    // check ticket user id and the current user token
    console.log(req.user.id)
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    res.status(200).json(ticket)

})

const deleteUserTicketById = asyncHandler (async(req,res) => {
    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    await ticket.remove()

    res.status(200).json({message: 'Ticket has been deleted !'})

})


const updateUserTicket = asyncHandler (async(req,res) => {
    
    const {product,description} = req.body;
    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedUser = await Ticket.findByIdAndUpdate(req.params.id, {
        product: product,
        description: description,
    },{new:true})

    res.status(200).json(updatedUser)
})
module.exports = {
    getUserTickets,
    createUserTickets,
    getUserSingleTicket,
    deleteUserTicketById,
    updateUserTicket
}