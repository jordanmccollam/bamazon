var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        message: "What's the ID of the item you are searching for?",
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