import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


export default function NewProject() {

    const proyectosContext = useContext (proyectoContext);
    const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    const [proyecto, guardarProyecto] = useState({
        nombre:"",
    })

    const onChangeProyectoi = e =>{
        guardarProyecto ({
            ...proyecto, 
            [e.target.name]: e.target.value
        })
    }

    const {nombre} = proyecto

    const onSubmitProyecto = e =>{
        e.preventDefault()

        if (nombre === ''){
            mostrarError();
            return;
        }

        agregarProyecto(proyecto)

        guardarProyecto({
            nombre:''
        })
        
    }

    return (
        <Fragment>
             <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={()=> mostrarFormulario()}
        >Nuevo Proyecto</button>

       { formulario  ?
        (
            <form className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}>
         <input type="text"
         className="input-text"
         placeholder="Nombre Proyecto"
         name="nombre"
         value = {nombre}
         onChange = {onChangeProyectoi} />

         <input type="submit"
         className="btn btn-primario btn-block" 
         value="Agregar Proyecto"/>
     </form>
           )
        : null
       }

       { errorFormulario ?  
       <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
       : null}
        </Fragment>
       
    )
}
