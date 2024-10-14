const express = require('express')
const { createRecord, getMemberRecords, getRecordsByT } = require('../Controller/recordController')
const recordRouter = express.Router()

recordRouter.post('/', createRecord)
recordRouter.get('/:userObjectId', getRecordsByT)
recordRouter.get('/member/:userObjectId', getMemberRecords)



module.exports = recordRouter