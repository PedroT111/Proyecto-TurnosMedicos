import axios from 'axios'
import React,{Fragment, useContext} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import proyectoContext from './useContext/proyectContext'
import Error from './error/Error'


const EliminarPaciente = () => {
    
    //useContext
    const proyectosContext = useContext(proyectoContext)
    const{ deletePaciente,guardarDeletePaciente,putIdPaciente,mostrarListarPacientes,guardarErrorDelete} = proyectosContext
    
    const {nombre, apellido, id }= putIdPaciente


    const deletePacienteApi = () =>{
        const consultarApi = async () => {
            const url= `http://localhost:3000/pacientes/${id}`
            await axios.delete(url)
        
        .then(respuesta => {
            mostrarListarPacientes()
            guardarDeletePaciente(false)
        })
        .catch(error =>{
            console.log(error)
            guardarDeletePaciente(false)
            guardarErrorDelete(true)
        })
        }
        consultarApi()
    }

    const eliminarPaciente = () =>{
        deletePacienteApi()
    }

    const cancelarEliminar = () => {
        guardarDeletePaciente(false)
    }

    return ( 
        <Fragment>
            
        <Modal isOpen={deletePaciente }>
            <ModalHeader>
                <h2>Atención!</h2>
            </ModalHeader>
            <ModalBody>
                <p>¿ Esta seguro que desea borrar al paciente {nombre} {apellido} ?</p>
            </ModalBody>
            <ModalFooter>
            <Button 
                className=  'btn btn-block btn-success'
                onClick={eliminarPaciente}
            > Borrar Paciente </Button>
            <Button 
                className= 'btn btn-block btn-danger'
                onClick={cancelarEliminar}
            > Cancelar </Button>
            </ModalFooter>
        
        </Modal>
        
        </Fragment>
            
        
     );
}
 
export default EliminarPaciente;