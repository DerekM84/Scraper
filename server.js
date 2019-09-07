var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

var exphbs = require("express-handlebars");

var mongojs = require("mongojs");

var axios = require("axios");
var cheerio = require("cheerio");


var databaseUrl = "scrapes";
var collections = ["scrapedData"];

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

app.get("/", function(req, res) {
  res.render("index");

});

// app.get("/all", function(req, res) {
//   db.layers.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(found);
//     }
// });
// });

// app.get("/saved", function(req, res) {
//     db.layers.find({}, function(error, found) {
//       if (error) {
//         console.log(error);
//       }
//       else {
//         res.json(found);
//       }
//   });
//   });

// app.get("/scrape", function(req, res) {
  
//   axios.get("https://www.theonion.com/").then(function(response) {
//   var $ = cheerio.load(response.data);
//   $(".slide_text").each(function(i, element) {
//     var imgLink = $(element).find("img").attr("src");
//     var className = $(element).find("span").text();
//     db.layers.insert({ link:imgLink, playerClass: className });
//   });
// });
// });
app.listen(PORT, function() {
  console.log("App running: port 3000");
});
