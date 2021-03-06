import React,{useState,useContext, Fragment} from 'react';
import axios from 'axios'
import turnoContext from './useContextTurnos/turnoContext'
import Error from'./ErrorTurnos'
import SeleccionEspecialidad from './SeleccionEspecialidad' ;
import SeleccionHorario from './SeleccionHorario'

const Turno = () => {

    //useContext
    const turnosContext = useContext(turnoContext)
    const {guardarDatosPacientes,datosPacientes, guardarVerificacionPaciente,verificacionPaciente,guardarErrorDocumento,errorDocumento,guardarElegirHorario,elegirHorario,/* guardarDniTurno,dniTurno */ } = turnosContext

    const [dniTurno, guardarDniTurno] = useState(0)

    const getPaciente = () =>{
        const consultarAPI =  () => {
            const url=`http://localhost:3000/pacientes`;
             axios.get(url)
            .then ( respuesta  => {
                guardarDatosPacientes(respuesta.data.respuesta)
                
                
            })
            .catch(error =>{
                console.log(error)
            })
        } 
        consultarAPI()
    }

    //Submit
    const SolicitarTurno = e =>{
        e.preventDefault()

        if(dniTurno.length=== 0){
            return console.log('error')
        }

        getPaciente()
        compararDocumento()
        
        
    }
    const compararDocumento = () =>{

        const lista = datosPacientes.map(paciente => {
            return (
                  {documento : paciente.documento})
        })
        
        const result = lista.filter(paciente => dniTurno === paciente.documento )
        if(result.length !== 0 ){
            return      guardarVerificacionPaciente(true)
            
        }
        guardarErrorDocumento(true)
    }

    return (
        <Fragment>
        <div className='asd'>
        <main  className='col-5'>
            <div className='contenedor-turnos'>
           {verificacionPaciente
            ?
                <SeleccionEspecialidad />
            : 
            <Fragment>
                <h6 color='white'>Solicitar un turno Online</h6>

                <form  onSubmit={SolicitarTurno} >
                <label
                    className=' label'
                >Ingrese su número de documento</label>
                <input 
                    type="text"
                    className=' input'
                    placeholder='Número de documento'
                    onChange={e => guardarDniTurno(parseInt(e.target.value)) }    
                />
                <button 
                    className='btn col-6 btn-success mt-4'
                    type='submit'
                >Solicitar </button>
                {errorDocumento ?<Error mensaje={'No se encontro el documento ingresado'}  />  : null}
                </form>  
            </Fragment>}
            </div>
        </main>
        <aside className='col-5 aside-horario'>
            {elegirHorario ?<SeleccionHorario />   : null}
        </aside >
        </div>
        </Fragment>
        );
}

export default Turno;