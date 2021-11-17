const express = require ('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require ('../controllers/authController')

//Rutas para autenticar usuario
// /api/auth
router.post('/', 
[
    check('email', 'Agregar email valido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min:6})
],
authController.autenticarUsuario
)

module.exports = router;