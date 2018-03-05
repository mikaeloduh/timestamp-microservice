// server.js
var express     = require('express'),
    bodyParser  = require('body-parser'),
    strftime    = require('strftime');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:query", function(req, res) {
  var utime = null;
  var ntime = null;
  
  var input = req.params.query;
  
  // Input is unix timestamp
  if (+input >= 0) {
    utime = +input;
    ntime = strftime('%F', new Date(+input * 1000));
  }
  
  // Input is Date string
  var timestamp = Date.parse(input);
  
  if (!isNaN(timestamp)) {
      utime = timestamp / 1000;
      ntime = strftime('%F', new Date(timestamp));
  }

  var obj = {"unix": utime, "natural": ntime};
  res.send(obj);
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
