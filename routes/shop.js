const path = require('path')

const express = require('express')
const rootDir = require('../util/path')
const router = express.Router()
const adminRouter = require('../routes/admin')


router.get('/',(req,res,next)=>{
    res.render('shop')
})



module.exports = router