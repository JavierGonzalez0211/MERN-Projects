import React, {useReducer} from 'react';
// import uuid from 'uuid';
import {v4 as uuid} from "uuid"

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {FORMULARIO_PROYECTO,
     OBTENER_PROYECTO,
     AGREGAR_PROYECTO,
     VALIDAR_FORMULARIO,
     PROYECTO_ACTUAL,
     ELIMINAR_PROYECTO,
    } from "../../types"




const ProyectoState = props => {
    const proyectos = [
        {id: 1,nombre: "hola"},
        {id: 2, nombre: "como te va"}
    ]

    const initialState = {
        proyectos:[],
        formulario : false,
        errorFormulario: false,
        proyecto : null
        }

    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    const mostrarFormulario =() =>{
        dispatch ({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = () =>{
        dispatch ({
            type: OBTENER_PROYECTO,
            payload: proyectos
        })
    }

    const agregarProyecto = proyecto =>{
        proyecto.id = uuid();

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    const mostrarError = () =>{
        dispatch ({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoId =>{
        dispatch ({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = proyectoId =>{
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
        value = {{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;