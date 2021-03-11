import React,{useState,useEffect} from 'react';
import axios from "axios";

import proyectoContext from "./proyectoContext"

const ProyectoState =   props =>{

    const [medicos, setMedicos] = useState([{}]);
    useEffect( ()=> {
        const consultarApi = async () =>{
          const url = "http://localhost:3000/medico";
          await axios.get(url)
          .then (respuesta =>{
              console.log(respuesta)
          })
          .catch(error => {
              console.log(error)
              
          })
          
      }
      consultarApi()
      
      }, [])


    

    return(
        <proyectoContext.Provider 
        value = {{
            medicos
        }}
        
        
        >

            {props.children}

        </proyectoContext.Provider>
    )
}


export default ProyectoState ;