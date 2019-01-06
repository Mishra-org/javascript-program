 var Employee = require('../models/employeemodels');
 //var router = express.Router(); 
var bodyParser = require('body-parser');
var validateEmployeeInput = require('../validation/employeevalid');
//var parser = require('./parsing');
module.exports = function(app){
      //app.use(parser());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended : true}));
      app.get('/chandra/prasad/:ID',function(req,res){
        Employee.findById( { _id: req.params.ID},function(err,employeeData){
            if(err) throw err;
            res.send(employeeData);
        });
        
    });

    app.get('/chandra/mishra/:fName',function(req,res){
        Employee.find( { firstName : req.params.fName },function(err,employeeData){
            if(err) throw err;
            res.send(employeeData);
        });

    });

    app.get('/chandra',function(req,res){
        Employee.find({},function(err,employeeData){
            if(err) throw err;
            res.send(employeeData);
        });
    });
    
    app.post('/chandra/mishra',function(req,res){
       /*var { errors, isValid} = validateEmployeeInput(req.body);
     //check validation
     if(!isValid){
      return res.status(400).json(errors);
     }*/
        if(req.body.id){
            Employee.findByIdAndUpdate(req.body.id,{
                employeeId : req.body.employeeId,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                age : req.body.age,
                address : req.body.address},function(err){
                    if(err) throw err;
                    res.send('thank you for updating document!!');
                
            });
            
        }
        
        else {
            var newDataInserting = Employee({
                employeeId : req.body.employeeId,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                age : req.body.age,
                address : req.body.address
            });
            newDataInserting.save(function(err){
                if(err) throw err;
                res.send('thank you for inserting new data!!');
            });
        }
    });
     
    app.delete('/chandra/mishra',function(req,res){
        Employee.findByIdAndDelete(req.body.id,function(err){
            if(err) throw err;
            res.send('Haaaaaa, successfully deleted!!!');
            
        });
    });
}


