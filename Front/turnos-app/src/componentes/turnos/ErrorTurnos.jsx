import React,{useContext} from 'react'
import turnoContext from './useContextTurnos/turnoContext'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'



const Error = ({mensaje}) => {

    const turnosContext = useContext(turnoContext)
    const {errorDocumento, guardarErrorDocumento } = turnosContext

    const modificarError = () =>{
        guardarErrorDocumento(false)
    }

    return ( 
        <Modal isOpen={errorDocumento}>
            <ModalHeader>
                <h1>Error!</h1>
            </ModalHeader>
            <ModalBody>
                <h3>{mensaje}</h3>
                
            </ModalBody>
            <ModalFooter>
            <h4>Intente Nuevamente</h4>
            <Button className='btn btn-block btn-danger' type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={modificarError}>Cerrar</Button>
            
            </ModalFooter>
        </Modal>
    )
}
 
export default Error;