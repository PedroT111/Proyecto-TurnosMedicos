import React,{useContext} from 'react'
import proyectoContext from '../useContext/proyectContext'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'



const Error = ({mensaje}) => {

    const proyectosContext = useContext(proyectoContext)
    const { guardarError,error,guardarErrorDelete,errorDelete,errorPostPacienteEmail,guardarErrorPostPacienteEmail } = proyectosContext

    const modificarError = () =>{
        guardarError(false)
        guardarErrorDelete(false)
        guardarErrorPostPacienteEmail(false)
    }

    return ( 
        <Modal isOpen={error|| errorDelete || errorPostPacienteEmail}>
            <ModalHeader>
                <h1>Error!</h1>
            </ModalHeader>
            <ModalBody>
                <h2>{mensaje}</h2>
                
            </ModalBody>
            <ModalFooter>
            <h4>Intente Nuevamente</h4>
            <Button className='btn btn-block btn-danger' type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={modificarError}>Cerrar</Button>
            
            </ModalFooter>
        </Modal>
    )
}
 
export default Error;