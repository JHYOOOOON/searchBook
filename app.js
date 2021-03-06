const express = require('express');

const app = express();
const port = 8080;
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
})

app.listen(process.env.PORT || port, function(err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});
