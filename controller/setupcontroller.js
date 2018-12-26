var Employee = require('../models/employeemodels.js');
//seeding document to database
module.exports = function(app){
    app.get('/chandra',function(req,res){
        var startEmployeeData = [
            {
                firstName : 'chandra',
                lastName : 'Mishra',
                age : 23,
                address: 'Bangalore'
            },
            {
                firstName : 'Abhay',
                lastName : 'Mishra',
                age : 20,
                address : 'Bangalore'
            },
            {
                firstName : 'vamshi',
                lastName : 'K',
                age : 25,
                address : 'Bangalore' 
            }
        ];
        Employee.create(startEmployeeData,function(err,results){
            if(err) throw err;
           res.send(results);
        });
    });
}

