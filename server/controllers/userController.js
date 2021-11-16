const Usuario = require ('../models/User')
const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require ('jsonwebtoken');


exports.createUser = async (req, res) =>{

    // revisar errores
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }
    const {email, password} = req.body
   
    try {
        // valida que el usuario sea unico
        let usuario = await Usuario.findOne({email})

        if (usuario) {
            return res.status(400).json({msg: 'el usuario ya existe'});
        }
        //crea el nuevo usuario
        usuario = new Usuario (req.body)

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt)

        //guardar usuario
        await usuario.save()

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
        res.status (400).send("hubo un erroe")
        
    }
    
}