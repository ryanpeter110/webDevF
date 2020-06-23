var express = require('express');
var app=express();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1/finalyear",function(err,db)
{
  if(!err){
console.log("we are connected");
app.use(express.static('public'));

app.get('/8b.html', function(req,res)
{
res.sendFile(__dirname+'/'+'8b.html');
});

app.get('/insert',function(req,res)
{
var usn=req.query.usn;
var namee=req.query.namee;
var company=req.query.company;
db.collection('student').insert({usn:usn,name:namee,company:company});
res.end(JSON.stringify(req.query));
});

app.get('/displayInfosys',function(req,res)
{
db.collection('student').find({company:'infosys'}).count(function(err,count){
 console.log(count);
db.collection('student').find({company:'infosys'}).sort().toArray(function(err,data){
console.log(data);
res.end("count is : "+count+" "+JSON.stringify(data));
});
});
});

app.get('/display',function(req,res)
{
db.collection('student').find().sort().toArray(function(err,data){
console.log(data);
res.end(JSON.stringify(data));
});
});

app.listen(4009);
}
});

//8b.html
<html>
<head>
<title>Placement</title>
</head>
<body>
<form action="insert" method="get"><br>
usn<input type="text" id="usn" name="usn"><br>
name<input type="text" id="namee" name="namee"><br>
company<input type="text" id="company" name="company"><br>
<input type="submit" value="submit">
</form>
</body>
</html>
