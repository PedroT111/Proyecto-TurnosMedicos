import React,{useState,useEffect,useContext} from 'react' ;
import axios from 'axios' ;
import proyectoContext from '../../useContext/proyectoContext'
import NuevaDescripcion from './NuevaDescripcion'
import Error from '../Error'


const ListaLibros = () => {
    //useContext
    const proyectosContext = useContext(proyectoContext) ;
    const {mostrarTodosLibros, guardarMostrarTodosLibros,guardarNuevaDescripcion,nuevaDescripcion,guardarIdLibroPut,guardarError,error,guardarErrorDeleteLibro,errorDeleteLibro} = proyectosContext

    //State Local
    const [buscarLibros,guardarBuscarLibros ] = useState([{}]); //State donde se guardan todos los libros disponibles
    const [idPersona, guardarIdPersona] = useState(0)   //State del id de la persona a que se le presta/devuelve el libro
    const [aliasPersona, guardarAliasPersona] = useState([{}]) ;
    
    //Consulta a la apí para traer todos los libros disponibles
    useEffect(() => {
        const consultarApi = () => {
            const url = 'http://localhost:3000/libro' ;
            axios.get(url)
            .then ( respuesta => {
                
                guardarBuscarLibros(respuesta.data.respuesta)
                guardarMostrarTodosLibros(false)
                
            })
            .catch(error =>{
                console.log(error)
                
            })
    }    
    consultarApi()
    }, [mostrarTodosLibros])

    //Conexion con la api para traer la información de las personas
    useEffect(() => {
        const consultarApi = () =>{
            const url=`http://localhost:3000/persona` ;
            axios.get(url)
            .then(respuesta =>{
                guardarAliasPersona(respuesta.data.respuesta) ;
                
            })
            .catch(error =>{
                console.log(error)
            })
            
        }
        
        consultarApi()
    }, [mostrarTodosLibros])


    // Permite la conexión con la API para DEVOLVER un libro
    const devolverLibro = (id, personaID ) =>{
       
        const consultarAPI = async () =>{
            const url =`http://localhost:3000/libro/devolver/${id}` ;
            await axios.put(url , {personaID : personaID } )
            .then( respuesta => {
                
                guardarMostrarTodosLibros(true)
                
            })
            .catch(error =>{
                console.log(error) ;
               
                
            }) 
        }
        consultarAPI()
    }   ;

    //Funcion que elimina el libro seleccionado
    const eliminarLibro=( idLibroEliminar, personaID) =>{
        
        const consultarAPI= async () => {
            const url = `http://localhost:3000/libro/${idLibroEliminar}` ;
            await axios.delete(url , {idPersona : personaID})
            
            .then(respuesta =>{
                
                console.log(respuesta)
                guardarMostrarTodosLibros(true)
            })
            .catch(error =>{
                console.log(error) ;
                guardarErrorDeleteLibro(true)

                
            })
        }
        consultarAPI()
    }

    //Función que presta el libro
        const prestarLibro =idLibroPrestar =>{
        
            guardarMostrarTodosLibros(true);
            const consultarAPI = async () =>{
                const url=`http://localhost:3000/libro/prestar/${idLibroPrestar}`;
                await axios.put(url, { personaID: idPersona})
                .then(respuesta =>{
                    
                    
                    guardarIdPersona(0)
                })
                .catch(error =>{
                    console.log(error)
                    
                    guardarError(true)
                })
            }
            consultarAPI()
            }     


    const editarLibro=(idLibro) =>{
        guardarIdLibroPut(idLibro)
        if(nuevaDescripcion){
            guardarNuevaDescripcion(false)
        }else{
            guardarNuevaDescripcion(true)
        }
    }


    return ( 
            <table className='table table-dark table-striped mt-3'>
                <thead>
                    <tr>
                        <th>Nombre del libro</th>
                        <th>Descripción del libro</th>
                        <th>Alias de la persona</th>
                        <th>Disponible</th>
                        <th>Prestar/Devolver</th>
                        <th>Eliminar</th>
                        <th>Nueva Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {buscarLibros.map(infoLibros=>(
                        <tr key={infoLibros.id}>
                            <td>{infoLibros.nombre}</td>
                            <td >{infoLibros.descripcion}</td>
                       {/*  agarra el array de objetos del get de persona y filtra el id y lo compara con el array de objetos de libros */}
                            { infoLibros.personaID===0 
                            ?
                                <td> --- </td> 
                            :
                            aliasPersona.filter(alias =>alias.id ===infoLibros.personaID).map(aliasFiltrado=>(<td>{aliasFiltrado.nombre}</td> ))
                            }
                            
                            {infoLibros.personaID === 0
                            ?
                                <td className='bg-success '> Disponible</td>
                            :
                                <td className='bg-danger'>No disponible</td>
                            }
                            
                            {
                            infoLibros.personaID===0
                                ?
                                <td>
                                    <form >
                                        <input 
                                            type="text" 
                                            placeholder='Ingrese el id de la persona'
                                            onChange={e => guardarIdPersona(e.target.value)}
                                        />
                                    </form>
                                    <button 
                                        className='btn btn-success '
                                        type='button'
                                        onClick={()=> prestarLibro(infoLibros.id)}
                                    > Prestar Libro</button>
                                    {error ? <Error  mensaje={'Surgio un error al prestar el libro!'}/> : null}
                            </td> 
                            :
                                <td>
                                    <button 
                                    className='btn btn-danger '
                                    type='button'
                                    onClick={()=>devolverLibro(infoLibros.id, infoLibros.personaID)  }
                                    > Devolver Libro</button>
                                </td>
                            }
                            
                            <td>
                                    
                                <button
                                    className='btn btn-block btn-danger'
                                    type='button'
                                    onClick={e =>{ eliminarLibro( infoLibros.id , infoLibros.personaID)} }
                                >Eliminar Libro
                                </button>
                                {errorDeleteLibro ?<Error mensaje={'El libro que se quiere eliminar se encuentra prestado'}/>   :null}
                                
                            </td>
                            <td>
                                    
                                 
                                {nuevaDescripcion ? <NuevaDescripcion /> :<button
                                    className='btn btn-block btn-success'
                                    type='button'
                                    onClick={e =>{ editarLibro( infoLibros.id )} }
                                >Ingresar nueva descripción
                                </button>
                                } 
                            </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        );
}

export default ListaLibros;