const mongoose = require('mongoose')
const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('listening on http://localhost:3000');
})

mongoose.connect('mongodb+srv://ods04139:CXkYw4nbwjmRr71e@cluster0.ii7yx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('mongodb connect'))
    .catch(() => console.log('mongodb connect faild'))

app.get('/', (req:any, res:any) => {
    res.send('hdfdfdi')
})