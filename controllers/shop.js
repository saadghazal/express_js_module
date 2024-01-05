const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");


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
      return cart.getProducts()
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
      });;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then((cart) => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}});
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0];

    }
    let newQuantity = 1;
    if(product){
      //...
    }
    return Product.findByPk(productId).then(product => {
      console.log(product);
      return fetchedCart.addProduct(product,{
        through: {
          quantity:newQuantity,
        }
      });
    }).catch(err => {
      console.log(err);
    });
  })
  .then(cart => {
    res.redirect("/cart");
  })
  .catch((err) => {})
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
