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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
      let product = new Product(title,imageUrl,description,price)
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