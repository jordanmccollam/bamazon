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