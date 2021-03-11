import React,{useState,useEffect} from 'react';
import axios from "axios";

import proyectoContext from './proyectoContext'

const ProyectoState =   props =>{

    const [error, guardarError] = useState(false)
    const [usuarios, guardarUsuario] =useState(
        [{}]
    )

    ///Persona
    const agregarUsuario = usuario => (
        guardarUsuario( [...usuarios,  usuario])
    )
    
    //Categoria
    const [buscarCategorias, stateBuscarCategorias] = useState([{}]);
    //State Local para activar el useEfect que envia por post a la BD
    const [enviarCategoria, guardarEnviarCategoria] = useState(false)
    //
    const [mostrarLibros, guardarMostrarLibros] = useState(false)   

    //Guardar el id de la categoria que se quiere eliminar o ver sus libros
    const [categoriaID, guardarCategoriaID] = useState() 
    
    
    

    //Conexion con la base de datos para consultar por las categorias
    useEffect(() => {
        const consultarApi = () => {
            axios.get("http://localhost:3001/categoria")
            .then(respuesta => {
                
                stateBuscarCategorias(respuesta.data.respuesta)
            })
            .catch(error => {
                console.log(error)
            })
        }
        consultarApi(); 
    }, [enviarCategoria]);
    
        
    //Spinner
    const[cargando , guardarCargando] = useState (false) ;
    
    


    return(
        <proyectoContext.Provider 
            value={{
                error,
                usuarios,
                buscarCategorias,
                enviarCategoria ,
                guardarError,
                agregarUsuario,
                stateBuscarCategorias,
                guardarEnviarCategoria,
                guardarMostrarLibros,
                mostrarLibros,
                guardarCategoriaID,
                categoriaID,
                guardarCargando,
                cargando
                }}
        >

            {props.children}

        </proyectoContext.Provider>
    )
}


export default ProyectoState ;