import React, { useContext,useState,useEffect,Fragment } from 'react';
import proyectoContext from '../../useContext/proyectoContext' ;
import Error from '../Error' ;
import axios from 'axios'
import ListaLibros from './ListaLibros'



const Libro = () => {
    //useContext
    const proyectosContext = useContext(proyectoContext)
    const {guardarMostrarTodosLibros,guardarErrorLibro,errorLibro} =proyectosContext

    //State local
    const [nuevaCategoria, guardarNuevaCategoria] = useState({
        nombre:'',
        descripcion:'',
        id:0
    })
    const [mostrarListaLibros, guardarMostrarListaLibros] = useState(false)

    //Usuario llena el formulario
    const onChangeCategoria= e =>{
        guardarNuevaCategoria({
            ...nuevaCategoria ,
            [e.target.name] : e.target.value
        })

    }

    const {nombre,descripcion,id}=nuevaCategoria ;

    //Usuario hace submit
    const submitLibro= e =>{
        e.preventDefault() ;
        
        //Validar
        if(nombre.trim()==='' | descripcion.trim()===''| id===0){
            return    guardarErrorLibro(true)
        } ;

        guardarErrorLibro(false) ;

        postLibro2()
    }

   
        const postLibro2 = e =>{
            const consultarApi = async () =>{
                const url='http://localhost:3000/libro' ;
                await axios.post(url,{
                    nombre:nombre,
                    descripcion:descripcion,
                    categoriaID:id
                })
                .then (respuesta =>{
                    
                    guardarMostrarTodosLibros(true)
                    
                })
                .catch(error =>{
                    console.log(error)
                    guardarErrorLibro(true)
                    
                    
                })
            }
            consultarApi()
        }
    const  mostrarListado = () =>{
        if(mostrarListaLibros){
            guardarMostrarListaLibros(false)
        }else{
            guardarMostrarListaLibros(true)
        }
    }
    return ( 
    <Fragment>
            

            <div className='form-usuario'>
                <div className='contenedor-form '>
                    {/* {error ?<Error mensaje='Todos los campos son obligatorios' />  : null} */}
                    <div className='mb-1'>
                        <form onSubmit={submitLibro} className='row g-3'>
                            <label  
                                htmlFor="nombre"
                                className='form-label'
                            >
                                Ingrese el nombre del nuevo libro.
                            </label>
                            <input 
                                type="text"
                                className='form-control'
                                id='nombre'
                                name='nombre'
                                placeholder='Ingrese nombre de la nueva categoria'
                                onChange={onChangeCategoria}
                            />

                            <label  
                                htmlFor="descripcion"
                                className='form-label'
                            >
                                Ingrese la Descripción del nuevo libro.
                            </label>
                            <input 
                                type="text"
                                className='form-control'
                                id='descripcion'
                                name='descripcion'
                                placeholder='Ingrese descripcion de la nueva categoria'
                                onChange={onChangeCategoria}
                            />

                            <label  
                                htmlFor="id"
                                className='form-label'
                            >
                                Ingrese el ID de la categoria a la que pertenece el nuevo libro.
                            </label>
                            <input 
                                type="number"
                                className='form-control'
                                id='id'
                                name='id'
                                placeholder='Ingrese id de la nueva categoria'
                                onChange={onChangeCategoria}
                            />
                            <button 
                                type='submit'
                                className='btn  btn-success'
                            >Enviar nuevo Libro</button>
                            {errorLibro ? <Error  mensaje={'Surgio un error al intentar cargar el nuevo libro!'} /> : null}
                            {mostrarListaLibros 
                            ?
                            <Fragment>
                                <button 
                                    type='button'
                                    className='btn  btn-danger'
                                    onClick={()=> mostrarListado()}   
                                        >Dejar de mostrar libros
                                </button>   
                                    <ListaLibros />
                            </Fragment>       
                                :<button 
                                    type='button'
                                    className='btn btn-block btn-info'
                                    onClick={()=> mostrarListado()}
                                        >Mostrar Libros</button>
                            }
                            </form>
                    </div>
                </div>
            </div> 
            
        
        </Fragment>

        
    );
}

export default Libro;