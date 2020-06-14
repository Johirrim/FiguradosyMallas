var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/home', { title: 'FIGURADOS Y MALLAS' });
});
/* GET productos page. */
router.get('/productos', function(req, res, next) {
  res.render('user/productos', { title: 'FIGURADOS Y MALLAS' });
});
/* GET contacto page. */
router.get('/contacto', function(req, res, next) {
  res.render('user/contacto', { title: 'FIGURADOS Y MALLAS' });
});
/* GET nosotros page. */
router.get('/nosotros', function(req, res, next) {
  res.render('user/nosotros', { title: 'FIGURADOS Y MALLAS' });
});

module.exports = router;
