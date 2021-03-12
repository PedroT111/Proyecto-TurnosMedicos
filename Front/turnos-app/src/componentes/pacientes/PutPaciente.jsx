import axios from 'axios'
import React,{Fragment, useContext,useState} from 'react'
import proyectoContext from './useContext/proyectContext'
import Error from './error/Error'



const PutPaciente = () => {

    //useContext
    const proyectosContext = useContext(proyectoContext)
    const{ guardarCambiarPaciente,putIdPaciente,guardarPutIdPaciente,mostrarListarPacientes } = proyectosContext

    
    const{id,nombre, apellido, obra_social, email, telefono} = putIdPaciente


    //OnChange
    const cambiarInformacion = e =>{
        guardarPutIdPaciente({
            ...putIdPaciente,
            [e.target.name]: e.target.value
        })
        console.log(id)
    }

    //Llamada a funcion para hacer el put
    const putPacienteApi = () =>{
        const consultarAPI =async () =>{
            const url =`http://localhost:3000/pacientes/${id}`
            await axios.put(url,{
                nombre:nombre,
                apellido:apellido,
                obra_social:obra_social,
                email:email,
                telefono:telefono
            } )
            .then(respuesta => {
                mostrarListarPacientes()
            })
            .catch(error =>{
                console.log(error)
            })
        }
        consultarAPI()
    }


    const submitPutPaciente = e =>{
        e.preventDefault()

        if(nombre === '' ||  apellido === '' || obra_social === '' || email === ''||  telefono ===''  ){
            console.log('error');
        }

        putPacienteApi()
        guardarCambiarPaciente(false)
        

    }


    return ( 

        <Fragment>
            <h3>Ingrese solamente la información que quiera modificar</h3>
            <form onSubmit={submitPutPaciente}>
                <label 
                    className='form-label'
                >Ingrese el nuevo Nombre</label>
                <input 
                    type="text" 
                    name="nombre" 
                    placeholder={nombre} 
                    className='form-control'
                    onChange={cambiarInformacion}   
                />
                <label 
                    className='form-label'
                >Ingrese el nuevo Apellido</label>
                <input 
                    type="text" 
                    name="apellido" 
                    placeholder={apellido} 
                    className='form-control'  
                    onChange={cambiarInformacion}    
                />
                <label 
                    className='form-label'
                >Ingrese la nueva Obra Social</label>
                <input 
                    type="text" 
                    name="obra_social" 
                    placeholder={obra_social} 
                    className='form-control'
                    onChange={cambiarInformacion}      
                />
                <label 
                    className='form-label'
                >Ingrese el nuevo email</label>
                <input 
                    type="text" 
                    name="email" 
                    placeholder={email} 
                    className='form-control'
                    onChange={cambiarInformacion}      
                />
                <label 
                    className='form-label'
                >Ingrese el nuevo número de telefono</label>
                <input 
                    type="text" 
                    name="telefono" 
                    placeholder={telefono} 
                    className='form-control'
                    onChange={cambiarInformacion}      
                />

            <button
                className='btn btn-block btn-success'
            >Enviar nueva información</button>


            </form>
        </Fragment>
     );
}
 
export default PutPaciente ;