 var Employee = require('../models/employeemodels');
var bodyParser = require('body-parser');

module.exports = function(app){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
   
    //link to html file
    app.get('/cpm',function(req,res){
        res.render('person');
    });

    app.get('/update',function(req,res){
        res.render('update');
    });

    app.get('/deletedata',function(req,res){
        res.render('index');
    });

    app.get('/getvalues',function(req,res){
        res.render('getdocument');
    });

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
        if(req.body.id){
            Employee.findByIdAndUpdate(req.body.id,{
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                age : req.body.age,
                address : req.body.address},function(err,firstName){
                    if(err) throw err;
                    res.send('thank you for updating document!!');
                
            });
            
        }
        else {
            var newDataInserting = Employee({
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
     /* app.delete('/chandra/:id',function(req,res){
          Employee.remove({_id : req.params.id},function(err,data){
              if(err) throw err;
              req.send(data,'/chandra');
              res.send("deletion success");
          } )
      })*/
    app.delete('/chandra/mishra',function(req,res){
        Employee.findByIdAndDelete(req.body.id,function(err){
            if(err) throw err;
            res.send('Haaaaaa, successfully deleted!!!');
        });
    });
}



