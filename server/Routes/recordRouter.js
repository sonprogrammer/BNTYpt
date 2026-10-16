const express = require('express')
const { createRecord, getMemberRecords, getRecordsByT, deleteMemberRecords, editMemberRecords, getTrainerRecords } = require('../Controller/recordController')
const {authenticate} = require('../middleware/authenticate')
const recordRouter = express.Router()

recordRouter.post('/',authenticate, createRecord)
recordRouter.get('/member',authenticate, getMemberRecords)
recordRouter.get('/trainer/:memberId',authenticate, getTrainerRecords)
recordRouter.delete('/note/:noteId',authenticate, deleteMemberRecords)
recordRouter.put('/note/:noteId',authenticate, editMemberRecords)



module.exports = recordRouter