const Product = require('../models/product')

module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    activeAddProduct: true,
    productCSS: true,
  });
};
module.exports.postAddProduct = (req, res) => {
    let product = new Product(req.body.title)
    product.save()
    res.redirect("/");
  }
module.exports.getProducts = (req, res, next) => {
        // we can pass the data that we could use in our view

    Product.fetchAll((products)=>{
        res.render("shop/product-list", {
            products_list: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
          });
    })
    
  }