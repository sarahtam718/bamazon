
// in mysql...

// create database [DONE]

// create table [DONE]

// insert data [DONE]

// in js...

// require packages
// require mysql & inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to mysql table (see documentation)
// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 3307,

//     // Your username
//     user: "root",

//     // Your password
//     password: "root",
//     database: "bamazon"
// });


// // show products from table using query
// function showProducts() {
//     connection.query("select * from products;", function (err, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res);
//             connection.end();
//         }
//     });
// }

// showProducts();


    // run inquirer with list
        // if else statement depending on if enough quantity for user to purchase
        // if enough, update table using query & show products again using query