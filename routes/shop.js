const path = require('path')

const express = require('express')
const rootDir = require('../util/path')
const router = express.Router()
const adminRouter = require('../routes/admin')


router.get('/',(req,res,next)=>{
    const products = adminRouter.products
    // we can pass the data that we could use in our view
    res.render('shop',{products_list: products,docTitle: 'Shop'})
})



module.exports = router