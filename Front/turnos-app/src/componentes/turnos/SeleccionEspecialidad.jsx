import React,{useState, useEffect, Fragment} from 'react' ;
import axios from 'axios' ;

const SeleccionEspecialidad = () => {

    const [especialidades, guardarEspecialidades] = useState([{}])



    useEffect(() => {
        const consultarAPI =  () => {
            const url=`http://localhost:3000/medicos`;
             axios.get(url)
            .then ( respuesta  => {
                guardarEspecialidades(respuesta.data.respuesta)
                
            })
            .catch(error =>{
                console.log(error)
            })
        } 
        consultarAPI()
    }, [])

    return (
        <Fragment>
            <form>
                <label >Especialidad</label>
                <select>
                    <option value="">Seleccionar</option>
                        {especialidades.map(especialidad =>(
                            <option 
                                key={especialidad.especialidad} 
                                value={especialidad.especialidad}
                            > {especialidad.especialidad}</option>
                        ))}
                </select>
            </form>
        </Fragment>
        );
}
 
export default SeleccionEspecialidad;