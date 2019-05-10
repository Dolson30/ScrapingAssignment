
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/scraper";
mongoose.connect(MONGODB_URI);

app.get("/scraper", function(req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://news.ycombinator.com/").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      var counter = 0;
      // For each element with a "title" class
      $(".title").each(function(i, element) {
          
        // Save the text and href of each link enclosed in the current element
        var headline = $(element).children("a").text();
        var url = $(element).children("a").attr("href");
        var array = {};
        array.Headline = headline;
        array.URL = url;
        // If this found element had both a title and a link
        if (headline && url) {
            db.Story.create(array)
            .then(function(story) {
                console.log( counter +": Inserted");
                counter ++;
            })
            .catch(function(err) {
                console.log(err);
            });

        }
      });
    });
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });


  app.get("/all", function(req, res) {
      console.log("Called")
    // Find all results from the scrapedData collection in the db
    db.Story.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });

// Listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});
