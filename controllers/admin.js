const Product = require('../models/product')

/**
 * Renders the add product page.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */


module.exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};



module.exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  })
    .then((result) => {
      console.log(result);
      
    })
    .catch((err) => {
      console.log(err);
    });
};


    module.exports.getEditProduct = (req, res, next) => {
      const editMode = req.query.edit;
      if(!editMode){
        return res.redirect("/")
      }
      const productId = req.params.productId;
      Product.findByPk(productId).then(product =>{
        if(!product){
          return res.redirect("/")
        }
         res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: true,
            product: product,

          });
      }).catch(err=>{
        console.log(err)
      })
     
    };

module.exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  Product.findByPk(productId).then(product =>{
    return product.update({
      title: newTitle,
      price: newPrice,
      description: newDescription,
      imageUrl: newImageUrl,
    })
    .then(result =>{
      console.log("UPDATED PRODUCT");
      res.redirect("/admin/products");
    })
  }).catch(err=>{
    console.log(err)
  })
  
};

module.exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render("admin/products", {
      products_list: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  }).catch(err =>{
    console.log(err)
  });
};

module.exports.postDeleteProduct =(req,res,next)=>{
  const productId = req.body.productId;
  Product.deleteById(productId)
  res.redirect('/admin/products')

}

