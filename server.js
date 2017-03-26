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

app.get('/getUrl/:id', function(request, response){
  var _id = request.params.id;
  db.url.findOne({
    key: _id
  }, function(err, doc){
    response.json(doc);
  });
});

app.post('/addUrlData', function(request, response){
  var data = request.body;
  var prefix = "vip.go";
  var key = getUniqueValue();
  data.shortUrl= prefix + "/" + key;
  data.key = key;
  db.url.insert(data, function(err, doc){
    response.json(doc);
  });
});

app.listen(3000);
console.log("Server is up and running on 3000");



//--------------------------
//URL Short algorithm
//--------------------------

var isUniqueValue = function(keyValue){
    db.url.findOne({
      key: keyValue
    }, function(err, doc){
      console.log(doc);
      return true;
    });
}

var getHashValue = function () {
  var number = Math.floor(Math.random()*1000);
  var char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var hashvalue = "";
  while(number > 0) {
      hashvalue+= char.charAt(number%62);
      number = Math.floor(number / 62);
  }
  return hashvalue;
}

var getUniqueValue = function(){
  var key;
  do {
    key = getHashValue();
  } while(isUniqueValue(key));
  return key;
}

var getShortUrl = function(url) {
  var prefix = "vip.go";
  var hashKey = getUniqueValue();
  console.log(hashKey);
  return prefix+"/"+hashKey;
}
