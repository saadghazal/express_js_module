const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  /**
   * Adds a product to the cart or updates the quantity if it already exists.
   * Reads the cart data from the JSON file, checks if the product exists,
   * updates the cart object accordingly, writes the updated cart back to the file.
   */
  static addProduct(id, productPrice) {
    // fetch all products from file
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        // update existing product
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // add new product
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static removeProduct(id,productPrice){
    fs.readFile(p,(err,fileContent)=>{
      if(!err){
        let cart = JSON.parse(fileContent);
        let updatedProducts = [...cart.products]
        let productIndex = updatedProducts.findIndex(p => p.id === id);
        
        let productToDelete = updatedProducts[productIndex];
        productToDelete.quantity--;
        if(productToDelete.quantity === 0){
          updatedProducts = updatedProducts.filter(p => p.id !== id);
        }
        cart.totalPrice -= productPrice * productToDelete.quantity;
        cart.products = updatedProducts;

        fs.writeFile(p, JSON.stringify(cart), (err) => {
          console.log(err);
        });

      }else{
        return;
      }
    })
  }
};
