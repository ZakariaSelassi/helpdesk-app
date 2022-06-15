const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getUserTickets,createUserTickets,getUserSingleTicket,deleteUserTicketById,updateUserTicket} = require('../controllers/ticketController')
// create a ticket
router.post('/',protect,createUserTickets)

// ticket by id
router.get('/:id',protect,getUserSingleTicket)

// all ticket 
router.get('/',protect,getUserTickets)
// delete ticket
router.delete('/:id',protect,deleteUserTicketById)

// update ticket
router.put('/:id',protect,updateUserTicket)
module.exports = router
