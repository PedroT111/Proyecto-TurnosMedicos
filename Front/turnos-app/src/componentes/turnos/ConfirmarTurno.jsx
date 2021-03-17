import React,{useContext} from 'react' ;
import turnoContext from './useContextTurnos/turnoContext'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

const ConfirmarTurno = () => {
    const turnosContext = useContext(turnoContext)
    const {guardarConfirmarCita, confirmarCita,guardarHorarioElegido,horarioElegido,fecha } = turnosContext

    const modificarError = () =>{
        guardarConfirmarCita(false)
    }
    console.log(fecha, horarioElegido )
    return ( 
        <Modal isOpen={confirmarCita}>
            <ModalHeader>
                <h1>Atención!</h1>
            </ModalHeader>
            <ModalBody>
                <h3>Confirma la reserva del turno el dia: <p>{}</p> en el horario: {horarioElegido}  </h3>
                
            </ModalBody>
            <ModalFooter>
            <h4>Intente Nuevamente</h4>
            <Button className='btn btn-block btn-danger' type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={modificarError}>Cerrar</Button>
            
            </ModalFooter>
        </Modal>
    )
}

 
export default ConfirmarTurno;