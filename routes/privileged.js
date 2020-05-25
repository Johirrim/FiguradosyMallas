var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var admin= require('firebase-admin');


//Traslate IBM
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: '6my2E9C966WSdu-AS5Z_ShIyti8y7MTNJwS5VWujGDxN',
  }),
  url: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/3b5d0616-2539-4b89-b708-37ce579360d9',
});

const translateParams = {
  text: 'Welcome to Figurados y Mallas privileged sesion. You are currently logged in.',
  modelId: 'en-es',
};

languageTranslator.translate(translateParams)
  .then(translationResult => {
    //console.log(JSON.stringify(translationResult, null, 1));
    traslate=translationResult.result.translations[0].translation;
    text=translateParams.text;
    
  })
  .catch(err => {
    console.log('error:', err);
  });  
//End traslate 



const db=admin.database(); 


/* GET private page. */
router.get('/', function(req, res, next) {
  res.render('privileged/signup',{layout:'privileged'});
});

/* GET main page. */
router.get('/main', function(req, res, next) {
  res.render('privileged/main',{Traslate: text, layout:'privileged'}); 
});

/* GET charts page. */
router.get('/charts', function(req, res, next) {
  res.render('privileged/charts',{layout:'privileged'}); 
});

/* GET calculator page. */
router.get('/calculator', function(req, res, next) {
  res.render('privileged/calculator',{layout:'privileged'}); 
});


/* GET tables page. */
router.get('/tables', function(req, res, next) {
  
  db.ref('Mensajes').once('value', (snapshot) => {
    data = snapshot.val();  
    console.log(data);
    res.render('privileged/tables',{Data: data, layout:'privileged'});
  });
});



/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('privileged/dashboard',{layout:'privileged'}); 
});

/* GET dashboard page. */
router.get('/tensorflow', function(req, res, next) {
  res.render('privileged/tensorflow',{layout:'privileged'}); 
});
/* GET iot page. */
router.get('/iot', function(req, res, next) {

  db.ref('Grafiles12m/muestreo').once('value', (snapshot) => {
    var data = snapshot.val();  
    var acum = Object.values(data);
    acum=acum[acum.length-1].Cortes;
    console.log(acum);
    res.render('privileged/iot',{Data: data,acumulado:acum, layout:'privileged'});
  });
});



router.post('/onoff',(req,res) => {

  if(req.body.controliot == 'on'){state=1; }else{ state=0;}

  const set = {
  State:state,
  };

  db.ref('Grafiles12m/control').set(set);
  res.redirect('/signup/iot');
}); 


router.post('/traslate',(req,res) => {
  if(req.body.teach == 'on'){res.render('privileged/main',{Traslate: traslate, layout:'privileged'});}else{res.render('privileged/main',{Traslate: text, layout:'privileged'}); }
}); 

module.exports = router;
