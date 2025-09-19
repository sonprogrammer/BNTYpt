const express = require('express')
const { createRecord, getMemberRecords, getRecordsByT, deleteMemberRecords, editMemberRecords } = require('../Controller/recordController')
const recordRouter = express.Router()

recordRouter.post('/', createRecord)
recordRouter.get('/:userObjectId', getRecordsByT)
recordRouter.get('/member/:memberId', getMemberRecords)
recordRouter.delete('/note/:noteId', deleteMemberRecords)
recordRouter.put('/note/:noteId', editMemberRecords)


module.exports = recordRouter