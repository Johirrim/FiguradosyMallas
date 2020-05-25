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
/* GET cotizar page. */
router.get('/cotizar', function(req, res, next) {
  res.render('user/cotizar', { title: 'Figurados y Mallas' });
});

router.get('/hierro', function (req, res, next) {
  
  db.ref('Cotizaciones/CotizacionesHierro').once('value', (snapshot) => {
    contador = 1+snapshot.val();
    db.ref('Cotizaciones/CotizacionesHierro').set(contador);
 });
  res.render('user/cotizar');
});
router.get('/malla', function (req, res, next) {
  
  db.ref('Cotizaciones/CotizacionesMalla').once('value', (snapshot) => {
    contador1 = 1+snapshot.val();
    db.ref('Cotizaciones/CotizacionesMalla').set(contador1);
 });
  res.render('user/cotizar');
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
