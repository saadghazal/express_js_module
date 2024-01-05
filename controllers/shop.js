const Product = require("../models/product");
const Cart = require("../models/cart");


module.exports.getProducts = (req, res, next) => {

  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        products_list: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
   
};



module.exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: `/products`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render("shop/index", {
      products_list: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err => {
    console.log(err)
  })
  
};

/**
 * Gets the user's cart and renders the cart page.
 *
 * Fetches the user's cart, gets the products in the cart, and renders the cart page.
 * Renders the cart page with the cart products and cart page details.
 * Handles any errors by logging to console.
 */
module.exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId, (product) => {
    Cart.addProduct(req.body.productId, product.price);
  });
  res.redirect("/cart");
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};
module.exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.removeProduct(productId, product.price);
    res.redirect("/cart");
  });
};
