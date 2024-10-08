const express = require('express');
const { createPost, getUserCalendar } = require('../Controller/calendarController');

const calendarRouter = express.Router()


calendarRouter.post('/', createPost)
calendarRouter.get('/user/email/:email', getUserCalendar)
calendarRouter.get('/user/kakao/:kakaoId', getUserCalendar)


module.exports = calendarRouter