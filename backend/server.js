const express = require('express');
const dotenv = require('dotenv').config();
const PORT =  process.env.PORT
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors');
// connect to databse
connectDB()

const app = express();
// @desc allow to get data from body 
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.get('/', (req,res) => {
    res.status(200).res.json({message:'Welcom to the Support Desk API'});
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoute'))
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})