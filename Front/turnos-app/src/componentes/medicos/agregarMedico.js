import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const AgregarMedico = () => {

    const [datos, setDatos] = useState([]);
    const [enviar, setEnviar] = useState(false);


    const guardarDato = (e) => {
        setDatos(
        {   
                ...datos,
                [e.target.name] : e.target.value
        }
        )

        
    }
    
    const onSubmit = (e) => {
        e.preventDefault();  
        
        setEnviar(true);

        e.target.reset();
        
    }
     
   
    useEffect( () => {
        const consultarApi = async () => {
            const url = `http://localhost:3000/medico`
            await axios.post( url, 
                datos
                
            )
            .then(respuesta => {
                console.log(respuesta)

            })
            .catch(error => {
                console.log(error)
            }
            )
        }
        consultarApi();
    }, [enviar])

    return(
        <div className ="divform">
            <div>
                <h2>Agregar Médico</h2>
            </div>
            <form onSubmit = {onSubmit} className ="form-group w-50">
                <label>Nombre</label>
                <input
                class="form-control"
                name = "nombre"
                onChange = {guardarDato}
                ></input>
                <label>Apellido</label>
                <input
                class="form-control"
                name = "apellido"
                onChange = {guardarDato}
                ></input>
                <label>Matricula</label>
                <input
                class="form-control"
                name = "matricula"
                onChange = {guardarDato}
                ></input>
                <label>Especialidad</label>
                <input
                class="form-control"
                name = "especialidad"
                onChange = {guardarDato}
                ></input>
                <button type = "submit">Agregar</button>
                
            </form>

        </div>
    )



}

export default AgregarMedico;