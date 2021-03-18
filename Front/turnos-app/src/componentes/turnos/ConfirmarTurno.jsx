import React,{useContext} from 'react' ;
import turnoContext from './useContextTurnos/turnoContext'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';

const ConfirmarTurno = () => {
    const turnosContext = useContext(turnoContext)
    const {guardarConfirmarCita, confirmarCita,horarioElegido,fecha,medicoElegido,dniTurno } = turnosContext

    //Función llama a la api
    const enviarCita = () =>{
        const consultarAPI =async () =>{
            const url = `http://localhost:3000/citas`
            await axios.post(url,{
                descripcion:'asd',
                fecha:fecha,
                hora:horarioElegido,
                medicoID:medicoElegido,
                documento:dniTurno
            })
            .then(respuesta =>{
                console.log(respuesta)
            })
            .catch(error =>{
                return    console.log(error)
                })
            } 
            consultarAPI()
        } 
        
    


    const modificarError = () =>{
        guardarConfirmarCita(false)
    }
    const aceptarCita = () =>{
        enviarCita()
        guardarConfirmarCita(false)
    }
    return ( 
        <Modal isOpen={confirmarCita}>
            <ModalHeader>
                <h1>Atención!</h1>
            </ModalHeader>
            <ModalBody>
                <h3>Confirma la reserva del turno el dia: <p>{}</p> en el horario {horarioElegido}  </h3>
                
            </ModalBody>
            <ModalFooter>
            
            <Button className='btn btn-block btn-danger' type="button"  data-bs-dismiss="modal" onClick={modificarError}>Cancelar</Button>
            <Button className='btn btn-block btn-success' type="button"  data-bs-dismiss="modal" onClick={aceptarCita}>Aceptar turno</Button>
            </ModalFooter>
        </Modal>
    )
}

 
export default ConfirmarTurno;