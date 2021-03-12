import React,{useState} from 'react';
import proyectoContext from'./proyectContext'
import axios from 'axios'


const ProyectoState = props => {


    //Errores
    const [errorNuevoPaciente, guardarErrorNuevoPaciente] = useState(false) ;
    const [error, guardarError] = useState(false) ;
    const [errorPostPacienteEmail, guardarErrorPostPacienteEmail] = useState(false)
    const [errorDelete, guardarErrorDelete] = useState(false) ;
    const [errorPut, guardarErrorPut] = useState(false) ;



    const [formularioNuevoPaciente, guardarFormularioNuevoPaciente] = useState(false) ;
    
    //Cambiar Paciente
    const [cambiarPaciente, guardarCambiarPaciente] = useState(false) ;
    const [putIdPaciente, guardarPutIdPaciente] = useState({
        id:0,
        nombre:'',
        apellido:'',
        obra_social:'',
        email:'',
        telefono:''
    })
    //Eliminar Paciente
    const [permitirDelete, guardarPermitirDelete] = useState(false) ;
    const [deletePaciente, guardarDeletePaciente] = useState(false) ;

    const [listaPacientes, guardarListaPacientes] = useState([{}]) ;
    const [mostrarLista, guardarMostrarLista] = useState(false) ;
    const [permitirCambios, guardarPermitirCambios] = useState(false) ;

    // Ver Turnos
    const [verTurnos, guardarVerTurnos] = useState(false) ;
    //Pacientes
    const mostrarListarPacientes = () =>{
        const consultarAPI =  () => {
            const url=`http://localhost:3000/pacientes`;
             axios.get(url)
            .then ( respuesta  => {
                guardarListaPacientes(respuesta.data.respuesta)
                
                guardarMostrarLista(true)
            })
            .catch(error =>{
                console.log(error)
                
                
            })
        } 
        consultarAPI()
    }

    return ( 
        <proyectoContext.Provider
        value= {{
            formularioNuevoPaciente,
            guardarFormularioNuevoPaciente,
            guardarError,
            error,
            guardarErrorNuevoPaciente,
            errorNuevoPaciente,
            mostrarListarPacientes,
            mostrarLista,
            listaPacientes,
            guardarPermitirCambios,
            permitirCambios,
            guardarCambiarPaciente,
            cambiarPaciente,
            guardarPutIdPaciente,
            putIdPaciente,
            guardarPermitirDelete,
            permitirDelete,
            guardarDeletePaciente,
            deletePaciente,
            guardarErrorDelete,
            guardarErrorPut,
            errorDelete,
            errorPut,
            guardarVerTurnos,
            verTurnos,
            guardarErrorPostPacienteEmail,
            errorPostPacienteEmail
            }}>
                
        {props.children}

        </proyectoContext.Provider>

        


     );
}
 
export default ProyectoState;