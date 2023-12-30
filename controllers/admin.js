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
/**
 * Handles saving a new product to the file.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
module.exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  let product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
/**
 * Exports a function that renders the edit product page.
 * It first checks if edit mode is enabled via the query parameter.
 * If not, it redirects to the homepage.
 * Otherwise it retrieves the product by ID and renders the edit page,
 * passing the product data and edit mode status.
 */

    module.exports.getEditProduct = (req, res, next) => {
      const editMode = req.query.edit;
      if(!editMode){
        return res.redirect("/")
      }
      const productId = req.params.productId;
      Product.findById(productId, (product)=>{
        if(!product){
          return res.redirect("/")
        }
         res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: true,
            product: product,

          });
      })
     
    };
/**
 * Handles editing an existing product.
 *
 * Extracts the updated product data from the request body,
 * creates a new Product instance, saves it, then redirects
 * to the admin products page.
 */
module.exports.postEditProduct = (req, res, next) => {
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  const newProductId = req.body.productId;
  let product = new Product(
    newProductId,
    newTitle,
    newImageUrl,
    newDescription,
    newPrice,
  );
  product.save();
  res.redirect("/admin/products");
};

/**
 * Exports a function that retrieves all products from the data store
 * and renders the admin products page.
 *
 * It calls the Product.fetchAll method to get all products,
 * then renders the admin/products view, passing the products list.
 */
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products_list: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

module.exports.postDeleteProduct =(req,res,next)=>{
  const productId = req.body.productId;
  Product.deleteById(productId)
  res.redirect('/admin/products')

}

