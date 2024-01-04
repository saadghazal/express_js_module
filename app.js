const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const errorController = require('./controllers/error')
const sequelize = require('./util/sql_database')

const app = express();


app.set("view engine", "ejs");
app.set("views", "views");
/*
allows us to any values globally on out express application
to set custom configuration to our express app to behave differently

***** View Engine *****
Allows us to tell express for any dynamic templates we're trying to render
please use this engine

***** Views *****
Allows us to tell express where to find these dynamic views

*/

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

//it register a middleware it will parse the incoming requests bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); // it will access static files that should be included in the html pages for example like a css files

// use allows us to add a new middleware function
// it accepts an array of request handlers
// app.use((req,res,next)=>{
//     console.log("In The Middleware")
//     next() // Allows the request to continue to the next middleware in line
// })

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use(errorController.error404);

sequelize.sync().then(result=>{
    app.listen(3000);

}).catch(err => {
    console.log(err)
})

