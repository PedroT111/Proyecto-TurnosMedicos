import React,{useState} from 'react'
import turnoContext from './turnoContext' ;



const TurnoState = ( props) => {

    const [datosPacientes, guardarDatosPacientes] = useState([{}])
    const [verificacionPaciente, guardarVerificacionPaciente] = useState(false)
    const [elegirMedico, guardarElegirMedico] = useState(false)
    const [elegirHorario, guardarElegirHorario] = useState(false)
    const [confirmarCita, guardarConfirmarCita] = useState(false)

    
    //Errores
    const [errorDocumento, guardarErrorDocumento] = useState(false)
    
    const [especialidadElegida, guardarEspecialidadElegida] = useState('')
    const [medicoElegido, guardarMedicoElegido] = useState('') ;
    
    const [fecha, guardarFecha] = useState( new Date())
    const options = { dateStyle: 'short' };
    const date = fecha.toLocaleString('es', options);
    
     
    const [horarioElegido, guardarHorarioElegido] = useState('')
    return ( 

        <turnoContext.Provider
        value= {{
            guardarDatosPacientes,
            guardarVerificacionPaciente,
            datosPacientes,
            verificacionPaciente,
            guardarErrorDocumento,
            errorDocumento,
            guardarElegirMedico,
            elegirMedico,
            guardarEspecialidadElegida,
            especialidadElegida,
            guardarMedicoElegido,
            medicoElegido,
            guardarElegirHorario,
            elegirHorario,
            guardarFecha,
            fecha,
            guardarConfirmarCita,
            confirmarCita,
            guardarHorarioElegido,
            horarioElegido

                        
            }}>
                
        {props.children}

        </turnoContext.Provider>
     );
}
 
export default TurnoState;