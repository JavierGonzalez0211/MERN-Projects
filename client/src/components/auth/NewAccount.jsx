import React, {useContext, useState, useEffect} from 'react'
import {Link} from "react-router-dom" 
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NewAccount = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, registrarUsuario} = authContext

    // En caso de que el usuario se haya autenticado o resitrado o sea un registro duplicado
    useEffect(() =>{
        if (autenticado){
            props.history.push('/projects')
        }

        if (mensaje){
            mostrarAlerta (mensaje.msg, mensaje.categoria)
        }
    }, [mensaje, autenticado, props.history])

    //State pra iniciar sesión
    const [usuario, guardarUsuario]= useState({
        nombre:"",
        email: "",
        password:"",
        confirmar:""
    })

    //extraer de usuario
    const {nombre, email, password, confirmar} = usuario;

    const onChange =(e)=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //Cuando usurio quiere iniciar sesión

    const onSubmit=e=>{
        e.preventDefault()

        // validar que no haya campos vacios
        if ( nombre.trim() === ''||
        email.trim() === ''||
        password.trim() === ''||
        confirmar.trim() === ''){
            mostrarAlerta ('Todos los campos son obligatorios',
            'alerta-error');
            return
        }

        //Password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta ( 'El password debe ser de al menos 6 caracteres',
            'alerta-error')
            return
        }
        if (password !== confirmar){
            mostrarAlerta ( 'Las passwords deben ser iguales',
            'alerta-error')
            return
        }

        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className = {`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className = "contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form onSubmit ={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="your name"
                        value={nombre} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" name="email" placeholder="your email"
                        value={email} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="your password"
                        value={password} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input type="password" id="confirmar" name="confirmar" placeholder="repeat your password"
                        value={confirmar} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Registrarme" />
                    </div>
                </form>
                <Link to={"/"} className="enlace-cuenta">
                   Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NewAccount;