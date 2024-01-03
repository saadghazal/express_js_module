
const Cart = require('../models/cart')
const db = require('../util/sql_database')



module.exports = class Product {
  constructor(id,title,imageUrl,description,price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price
  }
  save() {
   return db.execute("INSERT INTO Products (title,price,imageUrl,description) VALUES(?,?,?,?)",[
      this.title,
      this.price,
      this.imageUrl,
      this.description,
    ])
  }
  static fetchAll() {
    return db.execute('SELECT * FROM Products');
    
  }
  static findById(id) {
    
  }
  static deleteById(id) {
    
  }
};
