import React , {Fragment, useContext} from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export default function ListadoTareas() {

    
    const proyectosContext = useContext (proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;
    
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext

    if (!proyecto) return <h2>Seleccione un proyecto</h2>

    const [proyectoActual] = proyecto

    const onClickEliminar = () =>{
        eliminarProyecto (proyectoActual.id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length===0
                ? (<li className= "tareas"><p>No hay tareas</p></li> )
                : <TransitionGroup>
                   { tareasproyecto.map(tarea =>(
                   <CSSTransition 
                   key ={tarea.id}
                   timeout = {1000}
                   classNames = "tarea"
                   >
                        <Tarea                         
                        tarea ={tarea} 
                    />
                   </CSSTransition>
                ))}
                </TransitionGroup>
                }

            </ul>

                <button
                type ="button"
                className = "btn btn-eliminar"
                onClick = {onClickEliminar}
                >Eliminar Proyecto &times;</button>

        </Fragment>
    )
}
