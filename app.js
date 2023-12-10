const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')


//it register a middleware it will parse the incoming requests bodies
app.use(bodyParser.urlencoded({extended: false}))
// use allows us to add a new middleware function 
// it accepts an array of request handlers
// app.use((req,res,next)=>{
//     console.log("In The Middleware")
//     next() // Allows the request to continue to the next middleware in line
// })

app.use('/admin',adminRouter)

app.use(shopRouter)


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(3000)