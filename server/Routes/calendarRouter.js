const express = require('express');
const { createPost, getUserCalendar } = require('../Controller/calendarController');
const { authenticate } = require('../middleware/authenticate');

const calendarRouter = express.Router()


calendarRouter.post('/',authenticate, createPost)
calendarRouter.get('/user/email/:email',authenticate, getUserCalendar)
calendarRouter.get('/user/kakao/:kakaoId',authenticate, getUserCalendar)


module.exports = calendarRouter