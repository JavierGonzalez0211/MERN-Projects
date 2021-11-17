const Usuario = require ('../models/User')
const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require ('jsonwebtoken');

exports.autenticarUsuario = async (req, res) =>{

    // revisar errores
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }

    // extraer email y password
    const {email, password} = req.body

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario){
            return res.status(400).json({msg: "El usuario no existe"})
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)

        if (!passCorrecto){
            return res.status(400).json({msg: "El password es incorrecto"})
        }


        // si todo es correcto
            //crear y furnar ek JWT
            const payload = {
                usuario: {
                    id: usuario.id
                }
            }
    
            // firmar el JWT
            jwt.sign(payload, process.env.SECRETA, {
                expiresIn: 3600
            }, (error, token) => {
                if (error) throw error;
    
                 // res.json({msg: 'Usuario creado correctamente'})
                // res.status(200).json(usuario)
                res.json ({token})
            });

    } catch (error) {
        console.log(error)
    }
}