const Product = require('../models/product')

module.exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
     
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

    module.exports.getEditProduct = (req, res, next) => {
      const editMode = req.query.edit;
      if(!editMode){
        return res.redirect("/")
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        
      });
    };

module.exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render("admin/products", {
            products_list: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
    
          });
    })
}    