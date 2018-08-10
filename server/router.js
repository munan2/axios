const fs = require('fs')
const path = require('path')
let express = require('express')
const db = require('./db')
let info = require('./info')
let router = express.Router()
router.post('/saveInfo', (req, res) => {
    res.info = info.saveInfo(req.body)
    res.send({
        'status': 1
    })
})
module.exports = router;