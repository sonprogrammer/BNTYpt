const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRouter = require('./Routes/userRouter');
const postRouter = require('./Routes/postRouter');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');



dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('mongodb connect'))
    .catch(() => console.log('mongodb connect faild'))

app.listen(4000, () => {
    // console.log('listening on http://localhost:4000');
})

app.get('/', (req, res) => {
    res.send('hdfdfdi')
})



