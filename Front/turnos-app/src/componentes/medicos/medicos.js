import React, {useEffect, useState, useContext} from "react";
import axios from "axios";



//Componentes
import ListaMedico from "../listaMedico"
import EditarMedico from "./editarMedico";
import AgregarMedico from "./agregarMedico";

const Medicos = (props) => {

    const [editar, setEditar] = useState(false);   

    return(
        <div>
            <div>
                <h1>Header</h1>
            </div>

            <div className ="boxMedicos">
                
                <div className ="boxTabla">
                    <ListaMedico
                setEditar = {setEditar}/>
                </div>
            
            <div className ="boxformulario">
            {
                editar ? (    
                
                    <EditarMedico
                    setEditar = {setEditar}/>
                 ) : 
                <AgregarMedico/> 
            
            }
            </div>

               
            </div>

















        </div>
    )






}

export default Medicos;