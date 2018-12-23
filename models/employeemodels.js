var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    firstName : String,
    lastName : String,
    age : Number,
    address: String
});


var Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;
