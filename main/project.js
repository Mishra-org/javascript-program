var express = require('express');
var app = express();
var config = require('./config/index1.js');
var mongoose = require('mongoose');
//var steupcontroller = require('./controllers/setupcontroller');
var apicontroller = require('./controllers/apicontroller');
var port = process.env.PORT || 3000;

mongoose.connect(config.getDbConnectionString(),{ useNewUrlParser: true });
//mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds141294.mlab.com:41294/employee');
app.use('/ramro',express.static(__dirname+'/public'));
app.set('view engine','ejs');
//steupcontroller(app);
apicontroller(app);
app.listen(port);