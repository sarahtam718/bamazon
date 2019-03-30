
// in mysql...

// create database [DONE]

// create table [DONE]

// insert data [DONE]

// in js...

// require packages
// require mysql & inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to mysql table
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3307,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});


// // show products from table
function showProducts() {
    connection.connect(function (err) {
        if (err) throw err;
        // console.log("connected as id " + connection.threadId);
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price);
        }
        connection.end();
    });
}

// showProducts();

// ask user for what they want to buy and how much
inquirer.prompt([
    {
        type: "input",
        name: "toBuy",
        message: "What is the ID number of the product you wish to purchase?",
    },
    {
        type: "input",
        name: "amount",
        message: "How many units of the product do you wish to purchase?",
    }
]).then(ans => {
    // console.log("user input: ", ans);
    console.log("Checking our inventory...");
    // if else statement depending on if enough quantity for user to purchase
    connection.query(`SELECT * FROM products WHERE item_id ='${ans.toBuy}'`, function (err, data) {
        // console.log(data);
        for (let j = 0; j < data.length; j++) {
            // console.log("\nhow much do we have? ", data[j].stock_quantity, "\n how much does the customer want? ", ans.amount);
            if (err) {
                console.log(err);
            } else if (data[j].stock_quantity < ans.amount) {
                console.log("Our apologies, but we have an insufficient quantity of that product.")
                //     // start();
            } else {
                console.log(`You have purchased ${ans.amount} unit(s) of this product: ${data[j].product_name}.`)
                //         // updateDB();
                //         // showProducts();
                //         // total()
            }
        }

        connection.end()
    });

});

// start function with show products () & inquirer ()

// updateDB () that removes quantity from stock

// total() = stock_quantity - ans.amount x price