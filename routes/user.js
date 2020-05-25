var express = require('express');
var router = express.Router();

var admin= require('firebase-admin');
var serviceAccount = require("../figuradosymallas-902c0-firebase-adminsdk-m8yu6-4fcb676ec6.json");
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:'https://figuradosymallas-902c0.firebaseio.com/'
  //databaseURL:'https://base-de-datos-33763.firebaseio.com/'
});
const db=admin.database(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/main', { title: 'Figurados y Mallas' });
});

router.post('/new-contacto',(req,res)=>{
  console.log(req.body);
  const newContacto = {
    firstname:req.body.firstname,
    last:req.body.lastname,
    email:req.body.email,
    message:req.body.message
  };
  db.ref('Mensajes').push(newContacto);
  //res.render('index.hbs',{layouts:'index'});
  res.redirect('/');
});



module.exports = router;
