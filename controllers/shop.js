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
 
module.exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product)=>{
    res.render("shop/product-detail", {product: product, pageTitle: product.title, path: `/products`});
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

module.exports.postCart = (req,res,next)=>{
  Product.findById(req.body.productId, (product)=>{
    console.log(product)
  })
}

module.exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout',{
    path: '/checkout',
    pageTitle: "Checkout"
  })
}
module.exports.getOrders = (req,res,next)=>{
  res.render("shop/orders",{
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}
