/*jshint esversion: 6, node: true */

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

var db;
const mongoURL = "mongodb://kanthalion:starwars@ds119210.mlab.com:19210/star-wars-quotes";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

MongoClient.connect(mongoURL, (err, database) => {
    if (err) return console.error(err);
    db = database;
    app.listen(process.env.PORT || 3000, function() {
        console.log("listening on " + (process.env.PORT || 3000));
    });
});



app.get("/", (req, res) => {
    db.collection("quotes").find().toArray((err, results) => {
        if (err) return console.error(err);

        res.render("index.ejs", {
            quotes: results
        });
        console.log(results);
    });
});

app.post("/quotes", (req, res) => {
    db.collection("quotes").save(req.body, (err, result) => {
        if (err) return console.error(err);
        console.log("saved to database");
        res.redirect("/");
    });
});

app.put('/quotes', (req, res) => {
    // Handle put request
});