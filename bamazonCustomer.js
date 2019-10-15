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
    displayProducts();
})

function displayProducts() {
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;

            console.log("\nPRODUCTS *********************************");
            for (var i = 0; i < res.length; i++) {
                console.log("\n" + res[i].item_id  + ". " + res[i].product_name);
                console.log("$" + res[i].price + "\n");
            }
            console.log("******************************************");
        }
    )
}

function prompt() {
    inquirer.prompt([{
            type: "input",
            message: "What's the ID of the item you would like to buy?",
            name: "id"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "units"
        }
    ]).then(answers => {

        console.log("\nID: " + answers.id);
        console.log("Units: " + answers.units);

    })
}