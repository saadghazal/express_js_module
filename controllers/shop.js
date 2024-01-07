const Product = require("../models/product");



module.exports.getProducts = (req, res, next) => {

  Product.fetchAll()
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

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render("shop/index", {
      products_list: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err => {
    console.log(err)
  })
  
};

module.exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
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
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.CartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

module.exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts()
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.OrderItem = { quantity: product.CartItem.quantity }
        return product
      }))
    })
    .catch(err => console.log(err));
  })
  .then(result => {
    return fetchedCart.setProducts(null);
  })
  .then(result =>{
    res.redirect("/orders");

  })
  .catch(err => console.log(err));
}

module.exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['Products']})
  .then(orders => {

    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: orders,
    })
  })
   
};
/**
 * Deletes a product from the user's cart.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * The productId is extracted from the request body.
 * The user's cart is fetched and the product with the matching id is retrieved.
 * The product is removed from the cart and the cart is saved.
 * Finally, a response is sent to redirect to the /cart route.
 */
module.exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId; 
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.CartItem.destroy({ where: { productId: productId } });
    })
    .then((result) => {
      
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
