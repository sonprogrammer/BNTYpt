const express = require('express')
const { addFriend } = require('../Controller/friendController')
const friendRouter = express.Router()

friendRouter.post('/add', addFriend)