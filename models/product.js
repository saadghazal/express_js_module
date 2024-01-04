
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
  /**
   * Saves a new product to the database.
   *
   * Inserts a new row into the Products table with the product's title, price,
   * image URL and description. Uses parameterized query to avoid SQL injection.
   *
   * Returns a Promise that resolves after the INSERT completes.
   */
  save() {
    return db.execute(
      "INSERT INTO Products (title,price,imageUrl,description) VALUES(?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
  }
  /**
   * Fetches all products from the database.
   *
   * Executes a SELECT query to get all rows from the Products table.
   * Returns a Promise that resolves with the result of the query.
   */
  static fetchAll() {
    return db.execute("SELECT * FROM Products");
  }
  /**
   * Finds a product by ID.
   *
   * Executes a SELECT query to get a product row from the Products table with the given ID.
   * Returns a Promise that resolves with the result of the query.
   */
  static findById(id) {
    return db.execute("SELECT * FROM Products WHERE id = ?", [id]);
  }
  static deleteById(id) {
    
  }
};
