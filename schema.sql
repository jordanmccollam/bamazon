DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(100),
    price DEC(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("IPhone X", "Electronics", 1000.99, 100), ("Couch", "Home", 984.22, 50), ("Roku Express", "Electronics", 26.99, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Fisher-Price Learning Table", "Toys", 36.34, 50), ("Smart Home Camera", "Home", 25.98, 48), ("Mini Fridge", "Appliances", 279.99, 62);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Ice Maker", "Appliances", 117.99, 51), ("Dumbbell Pair", "Sports and Fitness", 35, 76), ("Pool Table", "Sports and Fitness", 999.99, 17),  ("Lego Batman Set", "Toys", 6.99, 40);

