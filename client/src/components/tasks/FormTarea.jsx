import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

export default function FormTarea() {

    const proyectosContext = useContext (proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, 
        obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext

    useEffect(() =>{
        if (tareaseleccionada !==null){
            guardarTarea (tareaseleccionada)
        } else {
            guardarTarea ({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    const [tarea, guardarTarea] = useState({
        nombre: '',
    })

    const {nombre}  = tarea

    if (!proyecto) return null

    const [proyectoActual] = proyecto

    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        if (nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Si es edicion o nueva tarea
        if (tareaseleccionada === null){
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            agregarTarea(tarea);
        } else{
            actualizarTarea(tarea)

            limpiarTarea()
        }

        

        obtenerTareas(proyectoActual.id)

        guardarTarea({
            nombre:''
        })

    }
    
    return (
        <div className="formulario">
            <form 
            onSubmit = {onSubmit}
            >
                <div className="contenedor-imput">
                    <input 
                    type="text"
                    className="input-text" 
                    placeholder="Nombre tarea..."
                    name = "nombre"
                    value = {nombre}
                    onChange ={handleChange}/>
                </div>
                <div className="contenedor-imput">
                    <input type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value = {tareaseleccionada ? 'Editar Tarea' : "Agregar tarea" }/>
                </div>
            </form>
            
            {errortarea ? <p className ="mensaje error">El nombre de la tarea es obligatorio</p>: null}
            
        </div>
    )
}
