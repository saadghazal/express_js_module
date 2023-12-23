module.exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    activeAddProduct: true,
    productCSS: true,
  });
};
const products = []
module.exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/");
  }
module.exports.getProducts = (req, res, next) => {
   
    // we can pass the data that we could use in our view
    res.render("shop", {
      products_list: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  }