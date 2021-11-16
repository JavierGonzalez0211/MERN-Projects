import React, {useState} from 'react'
import {Link} from "react-router-dom" 

const Login = () => {

    //State pra iniciar sesión
    const [usuario, guardarUsuario]= useState({
        email: "",
        password:""
    })

    //extraer de usuario
    const {email, password} = usuario;

    const onChange =(e)=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    //Cuando usurio quiere iniciar sesión

    const onSubmit=e=>{
        e.preventDefault()
    }

    return ( 
        <div className="form-usuario">
            <div className = "contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form onSubmit ={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="your email"
                        value={email} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="your password"
                        value={password} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block"
                        value="Iniciar sesion" />
                    </div>
                </form>
                <Link to={"new-account"} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;