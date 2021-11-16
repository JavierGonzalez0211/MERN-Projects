const express = require ('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require ('../controllers/userController')

//Rutas para crear usuario
router.post('/', 
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agregar email valido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min:6})
],
userController.createUser
)

module.exports = router;