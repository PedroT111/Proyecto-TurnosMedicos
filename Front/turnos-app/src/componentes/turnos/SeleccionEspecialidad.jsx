import React,{useState, useEffect, Fragment, useContext} from 'react' ;
import axios from 'axios' ;
import turnoContext from '../turnos/useContextTurnos/turnoContext' ;
import  {  registerLocale ,  setDefaultLocale  } from'react-datepicker' ;
import  DatePicker from'react-datepicker' ;
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
registerLocale('es', es)

const SeleccionEspecialidad = () => {


    //useContext
    const turnosContext = useContext(turnoContext)
    const { guardarVerificacionPaciente,verificacionPaciente,guardarElegirMedico,elegirMedico,guardarEspecialidadElegida,guardarMedicoElegido,medicoElegido,especialidadElegida,elegirHorario,guardarElegirHorario,guardarFecha,fecha } = turnosContext
    
    
    //State Local
    const [especialidades, guardarEspecialidades] = useState([{}])
    const [especialidadFiltrada, guardarEspecialidadFiltrada] = useState([])
    const [elegirFecha, guardarElegirFecha] = useState(false)

    

    const onChange = value =>{
        
        value.toString();
        guardarFecha(value)
        guardarElegirHorario(true)
        
        
    }
    


    //Funcion que trae todos los medicos
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
        
        
   /*  let lista = especialidades.map(especialidad =>{

        return (
            [especialidad.especialidad]
        )
        })
    
        for( let i = 0 ; lista.length >= i ; i++){  
            console.log(lista)

            for( let j = 0 ; especialidadFiltrada.length >= j ; j++){
                console.log(lista)
                if(lista[ i]!= especialidadFiltrada[j] ){
                    guardarEspecialidadFiltrada(...especialidadFiltrada,lista[ i])
                    console.log('asd')
                   
                    /*  especialidadFiltrada.push(lista[i]) */
          /*   }}

            
        } */
        
        
         /* for( let i = 0 ; especialidades.length > i ; i++){  
            for(let j = 0;especialidadFiltrada.length > j   ;j++){
                if(especialidades[{i}] !== especialidadFiltrada[{j}] ){
                    especialidadFiltrada.push(especialidades.especialidad[{i}]) 
                  
             }else{console.log(especialidades[{i}])}}
        }  */
   /*  } */  
    
   
    /* filtrarEspecialidades()
    console.log(especialidadFiltrada) */
    }


    const onChangeEspecialidad = especialidad => {
        guardarEspecialidadElegida(especialidad)
        guardarElegirMedico(true)
        
    }

    const onChangeProfesional = idProfesional =>{
        guardarMedicoElegido(idProfesional)
        guardarElegirFecha(true)
        
    }

    return (
        <Fragment>
            <h6 color='white'>Solicitar un turno Online</h6>
                <form>
                    <label >Especialidad :</label>
                    <select onChange= { (e) =>onChangeEspecialidad(e.target.value)}   >
                        <option value="">Seleccionar</option>
                            {especialidades.map(especialidad =>(
                                <option 
                                    key={especialidad.especialidad} 
                                    value={especialidad.especialidad}
                                > {especialidad.especialidad} </option>
                            ))}
                    </select>
                    
                    {elegirMedico 
                    ?<Fragment>
                    <label >Profesional :</label>
                    <select  onChange= { (e) =>onChangeProfesional(e.target.value)}   >
                        <option value="">Seleccionar</option>
                            {especialidades.filter(especialidad=> especialidadElegida === especialidad.especialidad ).map(aliasFiltrado=>(<option
                                key={aliasFiltrado.id}
                                value={aliasFiltrado.id}
                            >{aliasFiltrado.nombre }         {aliasFiltrado.apellido }</option> ))  
                            }
                    </select>

                    {elegirFecha  
                    ? 
                        <div >
                            <h3 className="text-light">Seleccione la fecha</h3>
                            <DatePicker onChange={onChange }  selected={fecha}
                            locale="es" isClearable     />
                        </div>   
                        
                    : null  }
                    </Fragment>

                    : null
                    
                    }
                </form>
                
                
            
        </Fragment>
        );
}
 
export default SeleccionEspecialidad;