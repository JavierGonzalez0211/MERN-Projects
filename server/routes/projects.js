const express = require ('express');
const router =  express.Router();
const projectController = require ('../controllers/projectController');
const auth = require ('../middleware/auth')
const {check} = require ('express-validator');

router.post('/', 
auth,
[
    check ('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
],
projectController.crearProyecto
)


//Rutas para autenticar proyectos
// /api/projects
router.post('/',
auth,
projectController.crearProyecto)

//obtener todos los proyectos
router.get('/',
auth,
projectController.obtenerProyectos)

router.put('/:id', 
auth,
[
    check ('nombre', 'El nombre del pryecto es obligatorio').not().isEmpty()
],
projectController.actualizarProyecto
)


router.delete('/:id', 
auth,
projectController.eliminarProyecto
)
module.exports = router