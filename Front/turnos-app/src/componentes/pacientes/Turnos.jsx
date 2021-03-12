import React,{useState, useEffect, useContext} from 'react';
import axios from 'axios'
import proyectoContext from './useContext/proyectContext'


const Turnos = () => {


    //useContext
    const proyectosContext = useContext(proyectoContext)
    const { listaPacientes} = proyectosContext


    //States locales que guardan la información traida de los axios
    const [resultadoGetTurnos, guardarResultadoGetTurnos] = useState([{}])
    const [resultadoGetMedicos, guardarResultadoGetMedicos] = useState([{}])
    const [idMedico, GuardarIdMedico] = useState(0)
    
     
    

    useEffect(() => {
        
            const consultarAPI = async () =>{
                const url = `http://localhost:3000/citas`
                await axios.get(url)
                .then(respuesta => {
                    guardarResultadoGetTurnos(respuesta.data.respuesta)
                    
                })
                .catch(error =>{
                    console.log(error)
                })
            }
            consultarAPI()
    }, [])
    
    
    //Funcion que trae la información de los medicos
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = `http://localhost:3000/medicos`
            await axios.get(url)
            .then(respuesta =>{
                guardarResultadoGetMedicos(respuesta.data.respuesta)
            })
            .catch(error =>{
                console.log(error)
                
            })
        }
        consultarAPI()
    }, [])

    
   /*  const{  descripcion, fecha, hora , medicoID , pacienteID} = resultadoGetTurnos ;
    const {id, nombre, apellido, matricula, especialidad} = resultadoGetMedicos ; */
    
    
    return ( 
        <table className="table table-striped table-hover col-5 ">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Medico</th>
                    <th>Paciente</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {resultadoGetTurnos.map(turnos =>(
                    <tr key={turnos.id}>
                        <td>{turnos.fecha}</td>
                        <td>{turnos.hora}</td>
                        {/* <td>{turnos.filter(medico => medicoID ===turnos.id )}</td> */}
                        {/* <td>{() => nombrefiltrado(turnos.medicoID)}</td> */}
                        {resultadoGetMedicos.filter(medico =>medico.id ===turnos.medicoID).map(aliasFiltrado=>(<td>{aliasFiltrado.nombre}</td> ))} 
                        {listaPacientes.filter(medico =>medico.id ===turnos.pacienteID).map(aliasFiltrado=>(<td>{aliasFiltrado.nombre}</td> ))} 
                        <td>{turnos.descripcion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default Turnos;