const Product = require("../models/product");

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
    editing: false,
  });
};

/**
 * Creates a new product based on request body data.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
module.exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product( title, imageUrl, price, description );
  product.save().then(result =>{
    // console.log(result);
    res.redirect("/admin/products");
  }).catch(err => console.log(err));
  
};

/**
 * Renders the edit product page if edit mode is enabled.
 * Looks up the product by ID, and renders the edit page with the product data.
 * Redirects to homepage if edit mode is not enabled or product not found.
 */
// module.exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const productId = req.params.productId;
//   req.user.getProducts({where: {id: productId}})
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: true,
//         product: product,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

/**
 * Updates a product in the database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  Product.findByPk(productId)
    .then((product) => {
      return product
        .update({
          title: newTitle,
          price: newPrice,
          description: newDescription,
          imageUrl: newImageUrl,
        })
        .then((result) => {
          console.log("UPDATED PRODUCT");
          res.redirect("/admin/products");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Retrieves all products from the database and renders the admin products page.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        products_list: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Deletes a product from the database.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DELETED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => {});
};
