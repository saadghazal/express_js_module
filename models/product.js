const fs = require("fs");
const { get } = require("http");
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
  constructor(title,imageUrl,description,price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price
  }
  save() {
    this.id = Math.floor(Math.random() * 1000000000).toString();
    getProductFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
};
