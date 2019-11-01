const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCT_QUERY = "Select * FROM products";


//add your password
//SQL database structure with database name =react_sql
//columns product_id is primary key, not null, auto increment name is varchar45 and price is INT 11
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourRootPassword",
  database: "react_sql"
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("go to /products to see products");
});

app.get("/products/add", (req, res) => {
  const { name, price } = req.query;
  const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}', ${price})`;
  connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("succesfully added product");
    }
  });
});

app.get("/products", (req, res) => {
  connection.query(SELECT_ALL_PRODUCT_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(4000, () => {
  console.log(`App listening on port 4000`);
});