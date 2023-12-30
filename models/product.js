const fs = require("fs");
const { get } = require("http");
const Cart = require('../models/cart')
const path = require("path");
const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "products.json",
  );
const getProductFromFile = (callBack) => {
  
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callBack([]);
    }
    callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id,title,imageUrl,description,price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price
  }
  save() {
    getProductFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(p=> p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      }else{
        this.id = Math.floor(Math.random() * 1000000000).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
      
    })
    
  }
  static fetchAll(callBack) {
    getProductFromFile(callBack)
  }
  static findById(id, callBack) {
    getProductFromFile(products => {
      const product = products.find(p=> p.id === id);
      callBack(product);
    })
  }
  static deleteById(id) {
    getProductFromFile(products => {
      const product = products.find(p => p.id === id)
     const updatedProducts = products.filter(p => p.id !== id);
     fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
     if(!err){
      Cart.removeProduct(id,product.price)
     }
     })
    })
  }
};
