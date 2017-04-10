var express = require("express");
var app = express();
var fs = require("fs");

function loadJsonFromFile(jsonPath, req, res) {

  fs.readFile(jsonPath, function(err, data) {
    if (err) {
      res.end(err.message);
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data.toString());
    }
  });
}

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/packages", function(req, res) {
  loadJsonFromFile("./resources/data/packages.json", req, res);
});

app.listen(3000, function () {
  console.log('Service listening on port 3000');
});