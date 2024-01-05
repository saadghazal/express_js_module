const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/sql_database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRouter);

app.use(shopRouter);

app.use(errorController.error404);

/**
 * Sets up a one-to-many relationship between the Product and User models.
 * The Product model belongs to a User - a product will have a userId field that references the User it belongs to.
 * The User model has many Products - deleting a User will also delete all their associated Products due to the CASCADE option.
 */
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

/**
 * Connects to the database using Sequelize and starts the Express app listening on port 3000.
 * On success, starts the app listening on port 3000.
 * On error, logs the error.
 */
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Max",
        email: "a@b.c",
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  }).then((cart) => {
    app.listen(3000);

  })
  .catch((err) => {
    console.log(err);
  });
