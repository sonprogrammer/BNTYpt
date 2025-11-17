const express = require('express')
const { createRecord, getMemberRecords, getRecordsByT, deleteMemberRecords, editMemberRecords } = require('../Controller/recordController')
const {authenticate} = require('../middleware/authenticate')
const recordRouter = express.Router()

recordRouter.post('/',authenticate, createRecord)
recordRouter.get('/member/:memberId',authenticate, getMemberRecords)
recordRouter.delete('/note/:noteId',authenticate, deleteMemberRecords)
recordRouter.put('/note/:noteId',authenticate, editMemberRecords)
recordRouter.get('/:userObjectId',authenticate, getRecordsByT)


module.exports = recordRouter