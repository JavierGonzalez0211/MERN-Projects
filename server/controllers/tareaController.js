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

//Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res)=> {
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
   //Obtener las tareas por proyecto
    const tareas = await Tarea.find({proyecto});
    res.json({tareas});

    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
        
    }

}

//Actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
           //Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;

        //si la tarea existe o no
        let tareaExiste = await Tarea.findById(req.params.id)

        if(!tareaExiste){
            return res.status(404).json({msg: 'no existe esa tarea'})
        }

        const existeProyecto = await Proyecto.findById(proyecto)
        
        if(existeProyecto.creador.toStrng() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }


        //revisar si el proyecto actual pertenece al usuario autenticado
    if(proyecto.creador.toStrng() !== req.usuario.id){
        return res.status(401).json({msg: 'No Autorizado'})
}


    //crea un objeto con la nueva informacion
    const nuevaTarea = {};
    if (nombre){
        nuevaTarea.nombre = nombre
    }
    if (estado){
        nuevaTarea.estado = estado
    }

    //Guardar tarea
    tareaExiste = await Tarea.findByIdAndUpdate({_id: req.usuario.id}, nuevaTarea,
        {new: true});
    res.json({tareaExiste})

    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }

    
}

// elimina una tarea
exports.eliminarTarea = async (req, res) =>{
    try {
        //Extraer el proyecto y comprobar si existe
     const {proyecto} = req.body;

     //si la tarea existe o no
     let tareaExiste = await Tarea.findById(req.params.id)

     if(!tareaExiste){
         return res.status(404).json({msg: 'no existe esa tarea'})
     }

     const existeProyecto = await Proyecto.findById(proyecto)
     
     if(existeProyecto.creador.toStrng() !== req.usuario.id){
         return res.status(401).json({msg: 'No Autorizado'})
     }


     //revisar si el proyecto actual pertenece al usuario autenticado
 if(proyecto.creador.toStrng() !== req.usuario.id){
     return res.status(401).json({msg: 'No Autorizado'})
}

//Eliminar
await Tarea.findOneAndRemove({_id: req.params.id})
res.json({msg: 'Tarea eliminada'})

 
 } catch (error) {
     console.log(error)
     res.status(500).send('hubo un error')
 }

}