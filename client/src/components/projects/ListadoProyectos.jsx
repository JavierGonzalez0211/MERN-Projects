import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';



export default function ListadoProyectos() {
    const proyectosContext = useContext (proyectoContext);
    const {proyectos, obtenerProyectos} = proyectosContext;

    useEffect(()=>{
        obtenerProyectos();
        // eliminar error de dependencia:
        //eslint-disable-next-line
    }, [])
    
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    

    return (
      <ul className= "listado-projectos">
          <TransitionGroup>
          {proyectos.map(proyecto =>(
              <CSSTransition
              key= {proyecto.id}
              timeout = {400}
              classNames = "proyecto">
              <Proyecto 
                 proyecto={proyecto}/>
          
              </CSSTransition>
         ))}
          </TransitionGroup>

      </ul>
    )
}
