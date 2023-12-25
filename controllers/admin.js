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

module.exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/products", {
            products_list: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
    
          });
    })
}    