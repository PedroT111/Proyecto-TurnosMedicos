import React, { Fragment,useContext, useState,useEffect } from 'react' ;
import turnoContext from './useContextTurnos/turnoContext' ;
import axios from 'axios' ;
import ConfimarTurno from './ConfirmarTurno'


const SeleccionHorario = () => {


     //useContext
     const turnosContext = useContext(turnoContext)
     const {guardarConfirmarCita,confirmarCita,guardarHorarioElegido,medicoElegido,fecha} = turnosContext

    
    //State Local
    const [informacionMedico, guardarInformacionMedico] = useState({})
    const [turnosProgramados, guardarTurnosProgramados] = useState([{}])
    const [horarios, guardarHorarios] = useState([
        "8:00 " , "8:30 ", "9:00  ", "9:30  ", "10:00 " , "10:30 ", "11:00 ", "11:30 ", "12:00 ", "12:30", "13:00 ", "13:30 ", "14:00 ", "14:30 ", "15:00 ", "15:30 "
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

    const filtrar = horario =>{

        let classname;
        let result = turnosProgramados.filter(turnos => Date.parse(horario) === turnos.hora &&turnos.fecha===fecha )
        console.log(result)
        if(result.length !==0){
            classname = 'text-warning'
            
        }else{
            classname = 'text-light'
            
        }
        
        
        return classname
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
                        {horarios.map(horario =>(
                            
                                <tr onClick={(e => onClick(horario))}
                                    className='btn btl-block  horario'
                                >
                                    {/* {turnosProgramados.filter(turnos =>turnos.hora === horarios && turnos.medicoID===medicoElegido).map(aliasFiltrado=>(<td className=' '>{horarios}</td> ))}  */}
                                    <td className={filtrar(horario)}>{horario}</td>
                                    
                                </tr>
                                
                            ))}
                    </tbody>
                </table>
                            
            </div> 
            
            
            
        </Fragment>    
            
            );
}
 
export default SeleccionHorario;