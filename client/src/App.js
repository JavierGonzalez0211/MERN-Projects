import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProyectoState from "./context/proyectos/proyectoState"
import TareaState from "./context/tareas/tareaState";



function App() {
  return (
    <ProyectoState>  
      <TareaState>
    <Router>
      <Routes>
        <Route exact path ="/" element ={<Login/>} />
        <Route exact path ="/new-account" element ={<NewAccount/>} />
        <Route exact path ="/projects" element ={<Projects/>} />
      </Routes>
    </Router>
      </TareaState>  
    </ProyectoState>
  );
}

export default App;
