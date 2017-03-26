var express = require('express');
var app = express();
var mongojs = require('mongojs');
var url  = "admin:admin@ds137110.mlab.com:37110/urlshort"
var db = mongojs(url,['url']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/getUrlLists', function(request, response){
  db.url.find(function(err, doc){
    response.json(doc);
  });
});

app.post('/addUrlData', function(request, response){
  var data = request.body;
  data.shortUrl= getShortUrl(data.url);
  db.url.insert(data, function(err, doc){
    response.json(doc);
  });
});

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getShortUrl = function(url) {
  var l = getRandomInt(0, url.length);
  var newUrl = url.slice(0, Math.floor(l/2) + 1);
  return newUrl;
}

app.listen(3000);
console.log("Server is up and running on 3000");
