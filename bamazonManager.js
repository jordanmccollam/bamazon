var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jojo1997",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    prompt()
})

function prompt() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "options"
    }]).then(answer => {

        switch (answer.options) {
            case "View Products for Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                getCurrentStock();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }

    })
}

function viewProductsForSale() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            console.log("\nPRODUCTS *********************************");
            for (var i = 0; i < res.length; i++) {
                console.log("\n" + res[i].item_id + ". " + res[i].product_name + " || $" + res[i].price +
                    "\nDepartment: " + res[i].department_name + " || Stock: " + res[i].stock_quantity
                );
            }
            console.log("\n******************************************");
        }
    )
    connection.end();
}

function viewLowInventory() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            console.log("\nLOW INVENTORY ****************************");
            for (var i = 0; i < res.length; i++) {

                if (res[i].stock_quantity < 5) {
                    console.log("\n" + res[i].item_id + ". " + res[i].product_name + " || $" + res[i].price +
                        "\nDepartment: " + res[i].department_name + " || Stock: " + res[i].stock_quantity
                    );
                }

            }
            console.log("\n******************************************");
        }
    )
    connection.end();
}

function getCurrentStock() {
    inquirer.prompt([{
            type: "input",
            message: "Which product(ID) would you like to add to?",
            name: "id"
        },
        {
            type: "input",
            message: "How many units would you like to add?",
            name: "units"
        }
    ]).then(answers => {
        connection.query(
            "SELECT * FROM products WHERE item_id = ?", [answers.id],
            function (err, res) {
                if (err) throw err;

                var currentStock = res[0].stock_quantity;
                addToInventory(currentStock, answers.id, answers.units);
            }
        )
    })
}

function addToInventory(currentStock, id, units) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [parseInt(currentStock) + parseInt(units), id]
    )
    console.log("Updated Inventory!");
    connection.end();
}

function addNewProduct() {
    inquirer.prompt([{
            type: "input",
            message: "Product Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Department:",
            name: "department"
        },
        {
            type: "input",
            message: "Price:",
            name: "price"
        },
        {
            type: "input",
            message: "Quantity:",
            name: "quantity"
        }
    ]).then(answers => {
        connection.query(
            "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)", [answers.name, answers.department, parseFloat(answers.price), parseFloat(answers.quantity)]
        )
        console.log("Product Added!");
        connection.end();
    })
}