// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var validator = require('./modules/validate');
var duplicateChecker = validator.duplicateChecker;
var emptyChecker = validator.emptyChecker;
var newSong;
var todaysDate = new Date();


/**********************
Functions to check for
duplicates or blank
fields
***********************/

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",
    dateAdded: todaysDate.toLocaleString()
  }
];

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  newSong = req.body;
  if(duplicateChecker(songs, newSong) || emptyChecker(newSong)) {
    res.sendStatus(400);
  } else {
    var date = new Date;
    newSong.dateAdded = date.toLocaleString();
    songs.push(newSong);
    res.sendStatus(201);
  }
});




app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
