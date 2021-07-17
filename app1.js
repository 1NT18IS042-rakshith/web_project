var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app1=express()
app1.use(express.static(__dirname));

app1.use(bodyParser.json());
app1.use(express.static('public'));
app1.use(bodyParser.urlencoded({
	extended: true
}));

app1.post('/register', function(req,res){
	var fname = req.body.fname;
    var mname = req.body.mname;
    var lname = req.body.lname;
	var gender=req.body.gender;
    var phone =req.body.phone;
    var address=req.body.address;
	var email =req.body.email;
	var password = req.body.password;
	

	var data = {
		"fname": fname,
        "mname": mname,
        "lname": lname,
		"gender":gender,
        "phone":phone,
        "address":address,
		"email":email,
		"password":password
		
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('index.html');
})


app1.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('register.html');
}).listen(3000)


console.log("server listening at port 3000");
