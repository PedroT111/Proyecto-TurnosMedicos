import React,{useState, useEffect, Fragment} from 'react' ;
import axios from 'axios' ;

const SeleccionEspecialidad = () => {

    const [especialidades, guardarEspecialidades] = useState([{}])
    const [especialidadFiltrada, guardarEspecialidadFiltrada] = useState([{}])
    const [asd, guardarAsd] = useState([])

    const{ especialidad} =especialidades

    useEffect(() => {
        const consultarAPI =async () => {
            const url=`http://localhost:3000/medico`;
            await axios.get(url)
             .then (  respuesta  => {
                guardarEspecialidades(  respuesta.data.respuesta)
                
                
            
            })
            .catch(error =>{
            return    console.log(error)
            })
        } 
        consultarAPI()
        
    }, [])

    


    const filtrarEspecialidades = () =>{
        
        
    let lista = especialidades.map(especialidad =>{

        return (
            { especialidad:especialidad.especialidad}
        )
        })
    console.log(lista)

        for( let i = 0 ; lista.length > i ; i++){  
            for(let j = 0;especialidadFiltrada.length > j   ;j++){
                if(lista[ i]!= especialidadFiltrada[j] ){
                    guardarEspecialidadFiltrada(...especialidadFiltrada,{})
                   
                    /*  especialidadFiltrada.push(lista[i]) */
            }}

            
        }
        
        console.log(especialidadFiltrada)
         /* for( let i = 0 ; especialidades.length > i ; i++){  
            for(let j = 0;especialidadFiltrada.length > j   ;j++){
                if(especialidades[{i}] !== especialidadFiltrada[{j}] ){
                    especialidadFiltrada.push(especialidades.especialidad[{i}]) 
                  
             }else{console.log(especialidades[{i}])}}
        }  */
    } 
    
   
    filtrarEspecialidades()
   


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
                            > {especialidadFiltrada.especialidad}</option>
                        ))}
                </select>
            </form>
        </Fragment>
        );
}
 
export default SeleccionEspecialidad;