const Project = require ('../models/Project')
const {validationResult} = require ('express-validator');


exports.crearProyecto = async (req,res) =>{

    // verifica si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return send.status(400).json({errores: errores.array()})
    }
    try {
        //crear nuevo proyecto
        const proyecto = new Project (req.body)

        //guardar el creador del proyecto
        proyecto.creador = req.usuario.id

        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error")
        
    }
}

//Obtener todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) =>{
    try {
        const proyectos = await Project.find({creador : req.usuario.id}).sort({creado: -1})
        res.send({proyectos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
        
    }
}

//Actualizar proyecto
exports.actualizarProyecto = async(req, res) =>{
     // verifica si hay errores
     const errores = validationResult(req);
     if (!errores.isEmpty()){
         return send.status(400).json({errores: errores.array()})
        }
    //extraer la informacion del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    if (nombre) {
        nuevoProyecto.nombre = nombre
    }
    try {
        //revisar el ID
        let proyecto = await Project.findById(req.params.id)

        if (!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //verificar el creador del proyecto
        if(proyecto.creador.toStrng() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        //actualizar
        proyecto = await Project.findByIdAndUpdate({_id: req.params.id}, {set: nuevoProyecto},
            {new: true});
        
        res.json({proyecto})
    } catch (error) {
        console.log(error)
        send.status(500).send('Error en el servidor')
    }

}

exports.eliminarProyecto = async (req, res)=>{
    try {
        //revisar el ID
    let proyecto = await Project.findById(req.params.id)

    if (!proyecto){
        return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    //verificar el creador del proyecto
    if(proyecto.creador.toStrng() !== req.usuario.id){
        return res.status(401).json({msg: 'No Autorizado'})
    }

    //eliminar el proyecto
    await Project.findOneAndRemove({_id: req.params.id})
    res.json({msg: 'El mensaje ha sido eliminado'})
    } catch (error) {
        console.log(error)
        res.status(500).send('error en el servidor')
    }
    
}