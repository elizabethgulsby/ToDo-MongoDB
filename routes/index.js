var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
// mongo Urlconnect formula = "protocol://host:portNumber/DatabaseName" - DatabaseName is case-sensitive
var mongoConnectUrl = "mongodb://localhost:27017/dcclass";
// Make a global for a place to stash our db connection
var db;

//runs when the server starts
mongoClient.connect(mongoConnectUrl, function(error, database) {
	db = database;
})


/* GET home page. */
router.get('/', function(req, res, next) {
	db.collection('students').find({}).toArray(function(error, studentResults) {
		console.log(studentResults);
		res.render('index', { students: studentResults });
	});
});

//new route, contains a form
router.get('/addNew', function(req, res, next) {
	res.render('addNew', {});
});

//inserting name entered at addNew to database
router.post('/addNew', function(req, res, next) {
	var newStudentName = req.body.newStudentName;
	db.collection('students').insertOne({
		name: newStudentName,
		cohortDate: 2017
	});
	res.redirect('/');  //passes us back to home page
});

module.exports = router;
