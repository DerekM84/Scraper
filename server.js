var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var exphbs = require("express-handlebars");

var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var logger = require("morgan");

var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewTimes";
mongoose.connect(MONGODB_URI);

app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function (req, res) {
  res.render("index");
});

// Add one article to saved collection
app.post("/save", function (req, res) {
  var body = req.body;

  var result = {
    headline: body.headline,
    img: body.img,
    link: body.link,
    author: body.author,
    time: body.time,
    _id: body._id,
  }

  db.Saved.create(result)
    .then(function (dbSaved) {
      console.log(dbSaved);
    }).catch(function (err) {
      console.log(err);
    });
  res.send("saved: " + result);
});

// remove one from saved collection
app.post("/unsave", function (req, res) {
  var body = req.body;
  db.Saved.remove({ _id: body._id }, function (err) {
    if (err) console.log(err);
  });
    res.send("unsaved: " + body._id);
  })

// get all scraped articles
  app.get("/all", function (req, res) {
    db.Article.find({}, function (error, found) {
      if (error) console.log(error);
      else {
        res.json(found);
      }
    });
  });

  // return all saved
  app.get("/saved", function (req, res) {
    db.Saved.find({}, function (error, found) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }
    });
  });


  // scrape 
  app.get("/scrape", function (req, res) {
    axios.get("https://www.phoenixnewtimes.com/arts").then(function (response) {
      var $ = cheerio.load(response.data);
      $(".latest-news").find("li").each(function (i, element) {

        var result = {}

        result.headline = $(element).find(".headline").text();
        result.img = $(element).find(".story-img").attr("data-original");
        result.time = $(element).find(".by-ago").text().split("by")[0].trim();
        result.author = $(element).find(".by-ago").find("a").text();
        result.link = "https://www.phoenixnewtimes.com" + $(element).find("a").attr("href");

        if (result.author === "") {
          result.author = "Multiple Authors"
        }
        if (result.headline !== "") {
          console.log(result);

          db.Article.create(result)
            .then(function (dbArticle) {
              console.log(dbArticle);
            }).catch(function (err) {
              console.log(err);
            });
        }
      });
    });
    res.redirect("/");
  });


  app.listen(PORT, function () {
    console.log("App running: port 3000");
  });
