const express = require('express')
const { addFriend } = require('../Controller/friendController')
const { authenticate } = require('../middleware/authenticate')
const friendRouter = express.Router()

friendRouter.post('/add',authenticate, addFriend)