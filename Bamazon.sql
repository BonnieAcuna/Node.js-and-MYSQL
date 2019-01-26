CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2) DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "Shoes", 15.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "Clothing", 7.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "Accessories", 3.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DVD", "Movies", 5.00, 10;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sweater", "Clothing", 15.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("table", "Houseware", 50.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("slippers", "Shoes", 5.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pans", "Housewares", 20.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog harness", "Dog_Accessories", 7.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog leash", "Dog_Accessories", 5.00, 9);
