var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Employee',{ useNewUrlParser: true });

var EmployeeSchema = new Schema({
    employeeId : {
        type : String,
        required : true
    },
    firstName : {
        type :String,
        required : true
    },
    lastName :{
        type : String,
        required : false
    }, 
    age : {
        type :Number,
        required : true
    }, //{ Type : Number, required : true}
    address: {
        type : String,
        required : true
    }
}/*,{collection : 'employee-data'}*/);


var Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;
