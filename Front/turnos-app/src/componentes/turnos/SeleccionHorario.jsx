import React, { Fragment,useContext, useState,useEffect } from 'react' ;
import turnoContext from './useContextTurnos/turnoContext' ;
import axios from 'axios' ;
import ConfimarTurno from './ConfirmarTurno'


const SeleccionHorario = () => {


     //useContext
     const turnosContext = useContext(turnoContext)
     const {guardarMedicoElegido,medicoElegido,guardarElegirHorario,elegirHorario,guardarFecha,fecha,guardarConfirmarCita,confirmarCita,guardarHorarioElegido,horarioElegido} = turnosContext

    
    //State Local
    const [informacionMedico, guardarInformacionMedico] = useState({})
    const [turnosProgramados, guardarTurnosProgramados] = useState([{}])
    const [horarios, guardarHorarios] = useState([
        "8:00 AM" , "8:30 AM", "9:00 AM ", "9:30 AM ", " 10:00 AM" , "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "13:00 PM", "13:30 PM", "14:00 PM", "14:30 PM", "15:00 PM", "15:30 PM"
    ])
    

     useEffect(() => {
        const consultarAPI =async () => {
            const url='http://localhost:3000/citas';
            await axios.get(url)
             .then (  respuesta  => {
                guardarTurnosProgramados(  respuesta.data.respuesta)
                
                
            
            })
            .catch(error =>{
            return    console.log(error)
            })
        } 
        consultarAPI()
    }, [])

    
    const onClick = horarioElegido =>{
        guardarHorarioElegido(horarioElegido)
        guardarConfirmarCita(true)
    }

    return ( 
        <Fragment>
                {confirmarCita ? <ConfimarTurno />  : null}
                <h1 className=" d-flex text-light justify-content-center align-items-center">Seleccione el horario</h1>
            <div className="table table-striped table-hover col-5 text-light cursor-zoom-in ">
                <table>
                    <thead> 
                        <tr>
                            <th>Horarios</th>
                        </tr>
                    </thead>
                        
                            
                        
                    <tbody>
                        {horarios.map(horarios =>(
                                <tr onClick={(e => onClick(horarios))}
                                    className='btn btl-block text-light'
                                >
                                    <td>{horarios}</td>
                                </tr>
                                
                            ))}
                    </tbody>
                </table>
                            
            </div> 
            
            {/* <div class="container col-2">
                <summary class="card border-primary">
                <div class="card-body">
                    <p class="card-text">8:00 AM</p>
                </div>
                </summary>
            </div>
            <div class="container col-2">
                <summary class="card border-primary">
                <div class="card-body">
                    <p class="card-text">8:00 AM</p>
                </div>
                </summary>
            </div> */}
            
        </Fragment>    
            
            );
}
 
export default SeleccionHorario;