import React,{useState} from 'react'
import turnoContext from './turnoContext' ;



const TurnoState = ( props) => {

    const [datosPacientes, guardarDatosPacientes] = useState([{}])
    const [verificacionPaciente, guardarVerificacionPaciente] = useState(false)

    //Errores
    const [errorDocumento, guardarErrorDocumento] = useState(false)

    
    return ( 

        <turnoContext.Provider
        value= {{
            guardarDatosPacientes,
            guardarVerificacionPaciente,
            datosPacientes,
            verificacionPaciente,
            guardarErrorDocumento,
            errorDocumento
            
            }}>
                
        {props.children}

        </turnoContext.Provider>
     );
}
 
export default TurnoState;