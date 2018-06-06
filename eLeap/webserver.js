/* educationary leap web-server script */

var printEnvironment = function() {
	console.log("Starting Educationary Leap server...");
	console.log("--- Development Environement ---\n--- Happy Coding --------------- :)");
	//replace with cool ASCII pics
};
printEnvironment();

var printServer = require('./server/printServer');
//printServer.printDev();
var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var querystring = require('querystring');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

var dbServer = require('./server/dbServer');
var applicationState = require('./server/dbServe/applicationState');
var classes = require('./server/dbServe/classes');
var opportunities = require('./server/dbServe/opportunities');
var login = require('./server/dbServe/login');
var persons = require('./server/dbServe/persons');
var roles = require('./server/dbServe/roles');

process.on('uncaughtException', function(error) {
    console.log(error);
    process.exit();
});

var indexHTML = fs.readFileSync("./public/index.html", "utf8");

var app = express();

var proxiedHttp = require("findhit-proxywrap").proxy(http, {strict: false});

app.set('port', process.env.PORT || 17490);
app.use(favicon(__dirname + '/public/img/risingDragonFolder.ico'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	req.session = req.session || {};
	if(req.url === '/') {
    	//&& (!req.session.userID)) || req.url.toLowerCase() === '/home')
        res.send(indexHTML);
        return;
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test/testClient')));

var httpServer = proxiedHttp.createServer(app).listen(app.get('port'), function(error) {
	error ? console.log(error) : console.log('Express HTTP server listening on port ' + app.get('port'));
});

/*****************************************************************
 * Application State
*****************************************************************/
app.post('/updateApplicationState', applicationState.updateApplicationState);


/*****************************************************************
 * Classes
*****************************************************************/
app.post('/addStudent', classes.addStudent);
app.post('/addStudents', classes.addStudents);
app.post('/createClass', classes.createClass);
app.post('/deleteClass', classes.deleteClass);
app.post('/getJoinedClasses', classes.getJoinedClasses);
app.post('/getOwnedClasses', classes.getOwnedClasses);
app.post('/getStudentsForClass', classes.getStudentsForClass);
app.post('/removeStudent', classes.removeStudent);
app.post('/updateClass', classes.updateClass);

/*****************************************************************
 * Login
*****************************************************************/
app.post('/login', login.login);
app.post('/logout', login.logout);
app.post('/isUserLoggedIn', login.isUserLoggedIn);

/*****************************************************************
 * Persons
*****************************************************************/
app.post('/signupPerson', persons.signupPerson);
app.post('/getPerson', persons.getPerson);

app.post('/getAllPersons', persons.getAllPersons);
app.post('/updatePerson', persons.updatePerson);

/*****************************************************************
 * Opportunities
*****************************************************************/
app.post('/createOpportunity', opportunities.createOpportunity);
app.post('/deleteOpportunity', opportunities.deleteOpportunity);
app.post('/getAllOpportunities', opportunities.getAllOpportunities);
app.post('/getJoinedOpportunities', opportunities.getJoinedOpportunities);
app.post('/getOwnedOpportunities', opportunities.getOwnedOpportunities);
app.post('/getOpportunity', opportunities.getOpportunity);
app.post('/leaveOpportunity', opportunities.leaveOpportunity);
app.post('/joinOpportunity', opportunities.joinOpportunity);
app.post('/updateOpportunity', opportunities.updateOpportunity);

/*****************************************************************
 * Roles
*****************************************************************/
app.post('/getRoles', roles.getRoles);


/*****************************************************************
 * Dynamic Single Page App HTML
*****************************************************************/
function sendIndexFile(req, res) {
	res.sendFile("./public/index.html", {root: "./"});
}

/*****************************************************************
 * Serve up Some Pages
*****************************************************************/

//test the database:
app.get('/db', sendIndexFile);

//our pages
app.get('/', sendIndexFile);
app.get('/about', sendIndexFile);
app.get('/accountsettings', sendIndexFile);
app.get('/dashboard', sendIndexFile);
app.get('/dbTest', sendIndexFile);
app.get('/home', sendIndexFile);
app.get('/instructorSettings', sendIndexFile);
app.get('/login', sendIndexFile);
app.get('/opportunity/:id', sendIndexFile);
app.get('/sample', sendIndexFile);
app.get('/signup', sendIndexFile);
app.get('/team', sendIndexFile);
app.get('/themesettings', sendIndexFile);


/*****************************************************************
 * Handle Exceptions
*****************************************************************/
// Handle 404
app.use(function(req, res) {
    console.log("unknown route: ");
    if (req.method === "POST") {
        res.status(404).send("route not found");
    } else {
    	function isImage(url) {
    		//does url have image extension?
    	};
        /*if (isImage(req.url)) {
            console.log("image URL not found");
            var options = {
                root: __dirname + '/'
            };
            res.set('Content-Type', 'image/png');
            res.sendFile("./public/img/imageNotFound.png");
            return;
        }*/
        //res.redirect('/index.html' + "#" + req.url);
        console.log("Get for " + req.url + " was not found.  Sending 404.html");
        res.redirect("/404.html");
    }
});

// Handle 500
app.use(function(error, req, res, next) {
    var json = JSON.stringify(error);
    var errorMsg = "Educationary Leap Webserver: " + json + error.stack;
    console.dir(error);
    var message = '500: Internal Server Error';
    res.status(500).send(message);
});

module.exports = app;
