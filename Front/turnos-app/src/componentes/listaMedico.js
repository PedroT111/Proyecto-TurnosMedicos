import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const ListaMedico = (props) => {
       
    const [medicos, setMedicos] = useState([{}]);   
    //Get Medicos
    useEffect(() => {
        obtenerMedicos()
        .catch(error => {
            console.log(error)
        })
    }, []);
    
   const obtenerMedicos = async () => {
        const data = await axios.get(`http://localhost:3000/medico`);
        const user = data.data.respuesta

        setMedicos(user);
    }

    //Editar medicosconst
    const [medicoEditado , setMedicoEditado] = useState([]);
    const[datosNuevos, setDatosNuevos] = useState([])
    const [guardarCambios, setguardarCambios] = useState(false);
    const [medicoID, setMedicoID] = useState("")
    
    const formularioEditar = (id, nombre, apellido, matricula, especialidad) => {
        props.setEditar(true);
        setMedicoID(id)
        setMedicoEditado(
            {
                nombre : nombre,
                apellido: apellido,
                matricula: matricula,
                especialidad: especialidad
            }
        )
    }

    //Eliminar Medico
    const eliminarMedico = (id) => {
        const consultarApi = async () => {
            const url = `http://localhost:3000/medico/${id}`
            axios.delete(url)
            .then (respuesta =>{
          
                console.log(respuesta)
                obtenerMedicos();
            })
            .catch(error => {
                console.log(error)
            })

        }
        consultarApi();
    }
    

    return(
        <div>
            
            <table className = "table w-75">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Matricula</th>
                        <th>Especialidad</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                    { medicos.map(medico =>(
                        <tr key = {medico.id} >
                            <td>{medico.id}</td>
                            <td>{medico.nombre}</td>
                            <td>{medico.apellido}</td>
                            <td>{medico.matricula}</td>
                            <td>{medico.especialidad}</td>

                            <td><button onClick = {() => {formularioEditar(medico.id, medico.nombre, medico.apellido,
                             medico.matricula, medico.especialidad)}} className="btn">Editar</button></td>
                            <td><button onClick = {() => {eliminarMedico(medico.id)}} className="btn">Eliminar</button></td>
                        </tr>
                    ))
                    }   
                </tbody>
            </table>


           
        </div>
   )
}
export default ListaMedico;
