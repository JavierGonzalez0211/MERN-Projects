import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import {v4 as uuid} from "uuid"

import {TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index'

const TareaState = props =>{
    const initialState = {
        tareas : [
            {id: 0, nombre: "Elegir Plataforma", estado: true, proyectoId:1},
            {id: 1, nombre: "Elegir colores", estado: false, proyectoId: 2 },
            {id: 2, nombre: "Elegir Plataformas de Pago", estado: false, proyectoId: 2},
            {id: 3, nombre: "Elegir Hosting", estado: true, proyectoId: 1},
    
        ],
        tareasproyecto: null,
        errortarea : false,
        tareaseleccionada: null
    }
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    const obtenerTareas = proyectoId =>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    const agregarTarea = tarea => {
        tarea.id = uuid()
        dispatch ({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = () =>{
        dispatch ({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = id =>{
        dispatch ({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    const cambiaEstadoTarea = tarea =>{
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    const guardarTareaActual = tarea =>{
        dispatch ({
            type: TAREA_ACTUAL,
            payload : tarea
        })
    }

    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    const limpiarTarea = ()=>{
        dispatch ({
            type: LIMPIAR_TAREA
        })
    }
    
    return(
        <TareaContext.Provider
        value ={{
            tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiaEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}>
        {props.children}
    </TareaContext.Provider>
)

}
export default TareaState;