import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const EditarMedico = (props) => {

    const guardarDato = (e) => {
        props.setDatosNuevos(
        {   ...props.datosNuevos,
            [e.target.name] : e.target.value
        }
        )
    }

    console.log(props.datosNuevos)

    const guardarCambios = () => {
        const consultarApi = async () => {
            const url = `http://localhost:3000/medico/${props.medicoID}`
            await axios.put(url, props.datosNuevos)
            .then (respuesta =>{
                console.log(respuesta)
            })
            .catch(error => {
                console.log(error)
                
            })
        } 
        consultarApi();
        props.setEditar(false);
    }


    return(
        <div className = "formularioEdicion">
           
            <h2>Editar Medico</h2>
            <div className ="form-group w-75">
                <label>Nombre</label>
                <input
                class="form-control"
                name = "nombre"
                onChange = {guardarDato}></input>
                <label>Apellido</label>
                <input
                class="form-control"
                name = "apellido"
                onChange = {guardarDato}></input>
                <label>Matricula</label>
                <input
                class="form-control"
                name = "matricula"
                onChange = {guardarDato}></input>
                <label>Especialidad</label>
                <input
                class="form-control"
                name = "especialidad"
                onChange = {guardarDato}></input>
                <button onClick = {() => {guardarCambios()}}>Guardar cambios</button>
                <button onClick = {() => {props.setEditar(false)}}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditarMedico;