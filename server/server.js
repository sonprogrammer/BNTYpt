const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

const User = require('./Models/userModel');
const userRouter = require('./Routes/userRouter');


dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())


app.use('/api/user', userRouter)



mongoose.connect('mongodb+srv://ods04139:CXkYw4nbwjmRr71e@cluster0.ii7yx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('mongodb connect'))
    .catch(() => console.log('mongodb connect faild'))

app.listen(4000, () => {
    // console.log('listening on http://localhost:4000');
})

app.get('/', (req, res) => {
    res.send('hdfdfdi')
})