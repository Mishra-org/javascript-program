//custom validation
var validator = require('validator');
var isEmpty = require('../isEmpty');
module.exports = function validateEmployeeInput(data){
    var errors = {

    }
   
    data.employeeId = !isEmpty(data.employeeId) ? data.employeeId :'';
    data.firstName = !isEmpty(data.firstName) ? data.firstName :'';
    data.age = !isEmpty(data.age) ? data.age :'';
    data.address = !isEmpty(data.address) ? data.address :'';
   
    if(validator.isEmpty(data.employeeId)){
        errors.employeeId = 'Employee id is required';
    }
    if(validator.isEmpty(data.firstName)){
        errors.firstName = 'employee first Name is required';
    }
    if(validator.isEmpty(data.age)){
        errors.age = 'please enter employee age';
    }
    if(validator.isEmpty(data.address)){
        errors.address = 'address field is required';
    }
    
   
    return {
        errors,
        isValid : isEmpty(errors)
    };
};
