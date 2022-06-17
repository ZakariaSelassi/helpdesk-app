const express = require('express')
const router = express.Router({mergeParams:true})
const {protect} = require('../middleware/authMiddleware')
const {getNotes,addNotes} = require('../controllers/noteController')

router.get('/',protect, getNotes)
router.post('/',protect,addNotes)

module.exports = router