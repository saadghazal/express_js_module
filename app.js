const http = require('http')
const express = require('express')

const app = express()

// use allows us to add a new middleware function 
// it accepts an array of request handlers
app.use((req,res,next)=>{
    console.log("In The Middleware")
    next() // Allows the request to continue to the next middleware in line
})
app.use((req,res,next)=>{
    console.log("In another Middleware")
    res.send('<h1>Hello From Express JS</h1>')
})


const server = http.createServer(app)

server.listen(3000)