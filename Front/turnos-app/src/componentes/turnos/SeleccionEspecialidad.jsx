import React,{useState, useEffect, Fragment} from 'react' ;
import axios from 'axios' ;

const SeleccionEspecialidad = () => {

    const [especialidades, guardarEspecialidades] = useState([{}])
    const [especialidadFiltrada, guardarEspecialidadFiltrada] = useState([{}])
    const [asd, guardarAsd] = useState([])

    useEffect(() => {
        const consultarAPI =async () => {
            const url=`http://localhost:3000/medico`;
            await axios.get(url)
            .then ( respuesta  => {
                guardarEspecialidades(  respuesta.data.respuesta)
                repeticion()
            })
            .catch(error =>{
            return    console.log(error)
            })
        } 
        consultarAPI()
        
    }, [])

    
    const repeticion = () =>{

        
    let lista = especialidades.map(especialidad =>(
        guardarEspecialidadFiltrada({...especialidadFiltrada , [especialidad]: especialidad.especialidad })
    ))
    console.log(lista)
         /* for( let i = 0 ; especialidades.length > i ; i++){

            
            for(let j = 0;especialidadFiltrada.length > j   ;j++){
                if(especialidades[{i}] !== especialidadFiltrada[{j}] ){
                    especialidadFiltrada.push(especialidades.especialidad[{i}]) 
                  
             }else{console.log(especialidades[{i}])}}
        }  */
    } 
    
    


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