import React,{useContext, useState} from 'react'
import axios from 'axios'
import proyectoContext from './useContext/proyectContext'
import Error from './error/Error'




const NuevoPaciente = () => {

    //useContext
    const proyectosContext = useContext(proyectoContext)
    const { guardarError,error,mostrarListarPacientes,guardarErrorPostPacienteEmail,errorPostPacienteEmail} = proyectosContext
    //State local 
    const [nuevoPaciente, guardarNuevoPaciente] = useState({
        nombre:'',
        apellido:'',
        email:'',
        obra_social:'',
        telefono:'',
        documento:''
    })

    

    const onChangeFormulario = e =>{
        guardarNuevoPaciente({
            ...nuevoPaciente,
            [e.target.name] : e.target.value
            
        }
        ) 
    }
    const { nombre, apellido,email,obra_social,telefono,documento} = nuevoPaciente ;

    const onSubmitNuevoPaciente = e =>{
        e.preventDefault() ; 
        //Validar
        if(nombre.trim()==='' || apellido.trim()===''|| telefono ===0 || obra_social.trim()==='' || email.trim()==='' || documento ===0){
            return    guardarError(true)
        } ;
        guardarError(false)

        postNuevoPaciente()

        //Reseteo el formulario
        guardarNuevoPaciente({
            nombre:'',
            apellido:'',
            email:'',
            obra_social:'',
            telefono:'',
            documento:''
        })
    }

     const postNuevoPaciente= () =>{
        const consultarAPI =async () =>{
            const url = `http://localhost:3000/pacientes`
            await axios.post(url,{
                nombre:nombre,
                apellido:apellido,
                email:email,
                obra_social:obra_social,
                telefono:telefono,
                documento:documento
            })
            .then(respuesta => {
                mostrarListarPacientes()
            })
            .catch(error => {
                guardarErrorPostPacienteEmail(true)
            })
        }
        consultarAPI()
    } 

    return (
        
            
                <form onSubmit={onSubmitNuevoPaciente}>
                    <label 
                        className='form-label'
                    >Ingrese el nombre del nuevo paciente</label>
                    <input 
                        type="text"
                        className='form-control'
                        placeholder=' Nombre del nuevo paciente'
                        name='nombre'
                        onChange={onChangeFormulario}
                        value={nombre}
                        required
                    />
                    <label 
                        className='form-label'
                    >Ingrese el apellido del nuevo paciente</label>
                    <input 
                        type="text"
                        className='form-control'
                        placeholder='Apellido del nuevo paciente'
                        name='apellido'
                        onChange={onChangeFormulario}
                        value={apellido}
                        required
                    />
                    <label 
                        className='form-label'
                    >Ingrese el email del nuevo paciente</label>
                    <input 
                        type='email'
                        className='form-control'
                        placeholder='email del nuevo paciente'
                        name='email'
                        onChange={onChangeFormulario}
                        value={email}
                        required
                    />
                    <label 
                        className='form-label'
                    >Ingrese la obra social del nuevo paciente</label>
                    <input 
                        type="text"
                        className='form-control'
                        placeholder='obra_social del nuevo paciente'
                        name='obra_social'
                        onChange={onChangeFormulario}
                        value={obra_social}
                        required
                    />
                    <label 
                        className='form-label'
                    >Ingrese el número de telefono del nuevo paciente</label>
                    <input 
                        type="tel"
                        className='form-control'
                        placeholder='telefono del nuevo paciente'
                        name='telefono'
                        onChange={onChangeFormulario}
                        value={telefono}
                        required
                    />
                    <label 
                        className='form-label'
                    >Ingrese el número de documento</label>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Documento del nuevo paciente'
                        name='documento'
                        onChange={onChangeFormulario}
                        value={documento}
                        required
                    />
                <button
                    className='btn col-6 m-2 btn-success btn-block'
                    type='submit'
                > Crear paciente</button>
                

                {error ?<Error  mensaje={'Todos los campos son obligatorios'}/>   : null}
                {errorPostPacienteEmail ? <Error  mensaje={'El Email ingresado se encuentre en uso'}/>  : null}
                </form>
            
    );
}

export default NuevoPaciente;