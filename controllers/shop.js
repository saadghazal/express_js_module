const Product = require('../models/product')


module.exports.getProducts = (req, res, next) => {
        // we can pass the data that we could use in our view

    Product.fetchAll((products)=>{
        res.render("shop/product-list", {
            products_list: products,
            pageTitle: "All Products",
            path: "/products",
          });
    })
    
  }
module.exports.getIndex = (req,res,next)=>{
  Product.fetchAll((products)=>{
    res.render("shop/index", {
        products_list: products,
        pageTitle: "Shop",
        path: "/",

      });
})
}
module.exports.getCart = (req,res,next)=>{
  res.render("shop/cart",{
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

module.exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout',{
    path: '/checkout',
    pageTitle: "Checkout"
  })
}