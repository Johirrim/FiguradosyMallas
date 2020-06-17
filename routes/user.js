var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

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
router.post('/email', async (req,res)=>{
  const {name, email, phone, message}=req.body;
  contentHTML = `
  <h1>Información del remitente</h1>
  <ul>
      <li>Nombre: ${name}</li>
      <li>Email: ${email}</li>
      <li>Teléfono: ${phone}</li>
  </ul>
  <h1>Mensaje</h1>
  <p>${message}</p>
`;

let transporter = nodemailer.createTransport({
  host: 'mail.figuradosymallas.com',
  port: 587,
  secure: false,
  auth: {
      user: 'info@figuradosymallas.com',
      pass: 'Robotina2016'
  },
  tls: {
      rejectUnauthorized: false
  }
});

let info = await transporter.sendMail({
  from: email, // sender address,
  to: 'info@figuradosymallas.com',
  subject: 'Contacto desde figuradosymallas.com ✅',
  html: contentHTML
})
  res.redirect('/');  
});

module.exports = router;
