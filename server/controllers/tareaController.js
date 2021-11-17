const Tarea = require ('../models/Tarea');
const Proyecto = require ('../models/Project');
const {validationResult} = require ('express-validator')

//Crea una nueva tarea

exports.crearTarea = async (req, res) => {
    
     // verifica si hay errores
     const errores = validationResult(req);
     if (!errores.isEmpty()){
         return send.status(400).json({errores: errores.array()})
     }

     

     try {
         //Extraer el proyecto y comprobar si existe
     const {proyecto} = req.body;

         const existeProyecto = await Proyecto.findById(proyecto)
         if (!existeProyecto){
             return res.status(404).json({msg: 'Proyecto no encontrado'})
         }

         //revisar si el proyecto actual pertenece al usuario autenticado
        if(proyecto.creador.toStrng() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
    }
    //creamos la tarea
    const tarea = new Tarea(req.body)
    await tarea.save()
    res.json({tarea});

     } catch (error) {
         console.log(error)
         res.status(500).send('hubo un error')
         
     }
}
