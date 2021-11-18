import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProyectoState from "./context/proyectos/proyectoState"
import TareaState from "./context/tareas/tareaState";
import AlertaState from './context/alertas/alertaState';



function App() {
  return (
    <ProyectoState>  
      <TareaState>
        <AlertaState>
    <Router>
      <Routes>
        <Route exact path ="/" element ={<Login/>} />
        <Route exact path ="/new-account" element ={<NewAccount/>} />
        <Route exact path ="/projects" element ={<Projects/>} />
      </Routes>
    </Router>
    </AlertaState>
      </TareaState>  
    </ProyectoState>
  );
}

export default App;
