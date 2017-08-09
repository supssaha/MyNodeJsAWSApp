/*globals bodyParser */
/*eslint-env node, express*/
/*jslint node:true*/
/*eslint no-unused-params:0*/
/* These lines are hints to the code editor */

/**
 * Load the appropriate modules for our web application
*/
var port = process.env.VCAP_APP_PORT || 3000;
var host = process.env.VCAP_APP_HOST || "localhost";
var http = require("http");
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var fs = require("fs");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});



app.get("/getproductbycode/:productcode", function (req, res) {
    fs.readFile(__dirname + "/" + "product.json", "utf8", function (err, data) {
        var arrayOfObjects = JSON.parse(data);

        res.end(JSON.stringify(arrayOfObjects[req.params.productcode]));
    });
});





app.get("/listproduct", function (req, res) {
    fs.readFile(__dirname + "/" + "product.json", "utf8", function (err, data) {
        console.log(data);
        res.end(data);
    });
});





app.post("/addcartitem/:productcode/:id/:quantity/:price", function (req, res) {
    // First read existing users.
    console.log(req.params.productcode);
    // var arrayOfObjects=[];
    fs.readFile(__dirname + "/" + "cart.json", "utf8", function (err, data) {


        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.carts.push({
            "productcode": req.params.productcode,
            "cartid": req.params.id,
            "quantity:": req.params.quantity,
            "price:": req.params.price
        });


        fs.writeFile(__dirname + "/" + "cart.json", JSON.stringify(arrayOfObjects), "utf-8", function (err) {
            if (err) throw err;
            console.log("write done!");
        });

        res.end(JSON.stringify(arrayOfObjects));

    });

});


app.get("/getcartitem/:cartid", function (req, res) {
    fs.readFile(__dirname + "/" + "cart.json", "utf8", function (err, data) {
        console.log(data);
        var arrayOfObjects = JSON.parse(data);
        var cartsdetails = { "carts": [] };
        for (var i = 0, length = arrayOfObjects.carts.length; i < length; i++) {
            if (arrayOfObjects.carts[i].cartid === req.params.cartid) {
                cartsdetails.carts.push(arrayOfObjects.carts[i]);
            }
        }

        res.end(JSON.stringify(cartsdetails));
    });
});
app.get("/getallcart", function (req, res) {
    fs.readFile(__dirname + "/" + "cart.json", "utf8", function (err, data) {
        console.log(data);


        res.end(data);
    });
});
app.delete("/deletecartitem/:cartid/:productcode", function (req, res) {
    fs.readFile(__dirname + "/" + "cart.json", "utf8", function (err, data) {
        console.log(data);
        var arrayOfObjects = JSON.parse(data);
        var cartsdetails = { "carts": [] };
        for (var i = 0, length = arrayOfObjects.carts.length; i < length; i++) {
            if ((arrayOfObjects.carts[i].cartid !== req.params.cartid) && (arrayOfObjects.carts[i].cartid !== req.params.productcode)) {
                cartsdetails.carts.push(arrayOfObjects.carts[i]);
            }
        }
        fs.writeFile(__dirname + "/" + "cart.json", JSON.stringify(cartsdetails), "utf-8", function (err) {
            if (err) throw err;
            console.log("write done!");
        });
        res.end(JSON.stringify(cartsdetails));
    });
});


app.delete("/deletecart/:cartid", function (req, res) {
    fs.readFile(__dirname + "/" + "cart.json", "utf8", function (err, data) {
        console.log(data);
        var arrayOfObjects = JSON.parse(data);
        var cartsdetails = { "carts": [] };
        for (var i = 0, length = arrayOfObjects.carts.length; i < length; i++) {
            if (arrayOfObjects.carts[i].cartid !== req.params.cartid) {
                cartsdetails.carts.push(arrayOfObjects.carts[i]);
            }
        }
        fs.writeFile(__dirname + "/" + "cart.json", JSON.stringify(cartsdetails), "utf-8", function (err) {
            if (err) throw err;
            console.log("write done!");
        });
        res.end(JSON.stringify(cartsdetails));
    });
});


var server = app.listen(port, function () {


    console.log("Example app listening at http://%s:%s", host, port);

});