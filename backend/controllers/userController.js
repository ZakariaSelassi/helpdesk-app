// @desc    Register a new user
// @route   /api/users
// @access  public 



const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const User = require('../models/userModel')


const registerUser = asyncHandler( async(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all field');
    }

    // find if user exists

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    // create user
    
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
       
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email, 
            token: generateToken(user._id)        })
    }else{
        res.status(400)
        throw new Error('Invalide user data')
    }
})
// @desc    Login a user
// @route   /api/users
// @access  public 
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    //check user and if password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @Desc get current user
//@Route /api/users/me
//@access Private
const getMe = asyncHandler( async(req,res) => {
    //req.user.id // we can access it because on authMiddleWare we set req.user with user in database

    res.status(200).json(req.user)
})

// @Desc generate token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}