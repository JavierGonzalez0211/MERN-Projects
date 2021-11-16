import React from 'react'
import NewProject from '../projects/NewProject'
import ListadoProyectos from '../projects/ListadoProyectos'

export default function Sidebar() {
    return (
        <aside>
                <h1>MERN<span>Tasks</span></h1>

                <NewProject/>

                <div className="proyecto">
                    <h2>Tus proyectos</h2>
                    <ListadoProyectos />
                </div>
        </aside>
    )
}
