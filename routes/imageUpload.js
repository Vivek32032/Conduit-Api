var multer = require('multer');
var imgModel = require('../models/ImageModel');
var express = require('express');
var router = express.Router();

  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage }).single('testImage');

router.get('/', function(req, res){
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.post('/',function(req, res, next){
  
   upload(req,res,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        const newImage = new imgModel({
            image:{
                data: req.file.filename,
                contentType: 'image/png'
            }
        })
        newImage.save()
        .then(()=>res.send("successfulll")).catch(err=>console.log(err))
    }
   })
});


module.exports = router;
