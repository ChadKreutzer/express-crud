/*jshint esversion: 6, node: true */

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

var db;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect("mongodb://kanthalion:starwars@ds119210.mlab.com:19210/star-wars-quotes", (err, database) => {
  if (err) return console.error(err);
  db = database;
  app.listen(process.env.PORT || 3000, function () {
    console.log("listening on " + (process.env.PORT || 3000));
  });
});



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.error(err);
    console.log("saved to database");
    res.redirect("/");
  });
})