CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INT AUTO_INCREMENT  NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(8,2),
    stock_quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Deep Conditioner", "Hair", 8.99, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Gel", "Hair", 3.50, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Hair", 6.50, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Adidas Sneakers", "Shoes", 45.99, 4);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Fuzzy Socks", "Shoes", 4.75, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sweatshirt", "Apparel", 25.00, 9);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Sweatpants", "Apparel", 21.99, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPhone Case", "Phone Accessories", 12.78, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Glass Screen Protector", "Phone Accessories", 4.50, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPhone Charger", "Apparel", 9.99, 9);

USE bamazon_db;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100),
    over_head_costs VARCHAR(100),
    PRIMARY KEY(department_id)
);

ALTER TABLE products
  ADD product_sales DECIMAL(50,2);
