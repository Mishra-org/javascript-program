const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
app.use(bodyParser.json());
var storage = multer.diskStorage({ 
    destination: function (req, file, callback) {
        callback(null, './uploads/')
    },
    filename: function (req, file, callback) {
        var datetimestamp = Date.now();
        callback(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ 
                storage: storage,
                fileFilter : function(req, file, callback) { 
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');

app.post('/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, 
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                res.json({error_code:0,err_desc:null, data: result});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })
}); 
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.listen('3000', function(){
    console.log('running on 3000...');
});
