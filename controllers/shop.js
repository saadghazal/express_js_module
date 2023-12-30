const Product = require('../models/product')
const Cart = require('../models/cart')


/**
 * Retrieves all products from the database and renders the product list view.
 *
 * The route handler calls Product.fetchAll() to get all products, then renders
 * the shop/product-list view, passing the products and page metadata.
 */
module.exports.getProducts = (req, res, next) => {
  // we can pass the data that we could use in our view

  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products_list: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};
 
module.exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product)=>{
    res.render("shop/product-detail", {product: product, pageTitle: product.title, path: `/products`});
  })
   

}
module.exports.getIndex = (req,res,next)=>{
  Product.fetchAll((products)=>{
    res.render("shop/index", {
        products_list: products,
        pageTitle: "Shop",
        path: "/",

      });
})
}
/**
 * Renders the cart view.
 *
 * Retrieves the cart data and renders the shop/cart view,
 * passing the cart data and page metadata.
 */
module.exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
     Product.fetchAll((products)=>{
      const cartProducts = []
      products.forEach(product => {
        const cartProduct = cart.products.find(prod => prod.id == product.id);
        // if the product is in the cart, add it to the cartProducts array
        if(cartProduct){
          cartProducts.push({productData: product,quantity:cartProduct.quantity});
        }
      })
      console.log(cartProducts)
      res.render("shop/cart", { 
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts
      });
     })
      // Product.fetchAll(products =>{
      //   const cartProducts = []
      //   for(let product in products){
      //     const cartProduct = cart.products.find(prod => prod.id == product.id);
      //     // if the product is in the cart, add it to the cartProducts array
      //     if(cartProduct){
      //       cartProducts.push({productData: cartProduct,quantity:cartProduct.quantity});
      //     }
      //   }
      //   res.render("shop/cart", {
      //     path: "/cart",
      //     pageTitle: "Your Cart",
      //     products: cartProducts
      //   });
      // })

  })
  
};

module.exports.postCart = (req,res,next)=>{
  Product.findById(req.body.productId, (product)=>{
    Cart.addProduct(req.body.productId,product.price)

  })
  res.redirect('/cart')

}

module.exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout',{
    path: '/checkout',
    pageTitle: "Checkout"
  })
}
module.exports.getOrders = (req,res,next)=>{
  res.render("shop/orders",{
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}
