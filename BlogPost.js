/* Authors: Allen Shih, Dylan Mozlowski
 * Team: BlueJay, Server Team
 */

var express = require('express');
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended: false}))

console.log('faggot')
app.post('/posts', function(req, res){
  console.log("POST")
  console.log(req)
});
app.put('/posts', function(req, res){
  console.log(req.body)
  console.log(req.params)
});
app.get('/posts/:id', function(req, res){
  console.log(req.params)
});
app.delete('/posts/:id', function(req, res){
  console.log(req.params)
});
app.listen(9000);
