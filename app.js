const express = require('express')
const bodyParser = require('body-parser')

const app = express()


//it register a middleware it will parse the incoming requests bodies
app.use(bodyParser.urlencoded({extended: false}))
// use allows us to add a new middleware function 
// it accepts an array of request handlers
// app.use((req,res,next)=>{
//     console.log("In The Middleware")
//     next() // Allows the request to continue to the next middleware in line
// })
app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type = "text" name="title"><button type="submit">Add Product</button></form>')
})

app.use('/product',(req,res)=>{
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req,res,next)=>{

    res.send('<h1>Hello From Express JS</h1>')
})


app.listen(3000)