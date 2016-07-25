var express         = require('express');
var app             = express();
// var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var routes          = require(__dirname + '/routes/routes.js');

var port = process.env.PORT || 8080;
// var db = require('./config/db');

// connectionsubject = mongoose.createConnection(db.urlSubjectViews);

app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use('/api/v1', routes.router);
// require('./app/routes')(app);

app.listen(port);
console.log('magic happens on port ' + port);
exports = module.exports = app;
