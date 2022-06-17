const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')



// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  private

const getNotes = asyncHandler(async (req,res) => {
    
   
    // Step 1 : Get user id
    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error('User not found')
    }
    // STEP 2 : get the ticket id
    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }
    // STEP 3 : get all notes existing for that ticket
    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})

// @desc    add notes for a ticket
// @route   post /api/tickets/:ticketId/notes
// @access  private

const addNotes = asyncHandler(async (req,res) => {
    console.log(req.body.text)
    console.log(req.user.id)
    // 1 .
    const userID = await User.findById(req.user.id)
    if(!userID){
        res.status(401)
        throw new Error("User not found")
    }
    
    // 2 . 
    const ticketID = await Ticket.findById(req.params.ticketId)
    if(ticketID.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Ticket not found')
    }
    console.log(ticketID)

    //3 .

    const note = await Note.create({
        text:req.body.text,
        isStaffe: false,
        ticket : req.params.ticketId,
        user: req.user.id
    })

    res.status(200).json(note)
    
})

module.exports = {
    getNotes,
    addNotes
} 