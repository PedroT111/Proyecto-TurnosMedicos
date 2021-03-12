import React,{Fragment, useState,useContext} from 'react'
import axios from 'axios'
import proyectoContext from './useContext/proyectContext'
import NuevoPaciente from './NuevoPaciente'
import PutPaciente from './PutPaciente'
import EliminarPaciente from './EliminarPaciente'
import Turnos from './Turnos'
import Error from './error/Error'


const Pacientes = () => {

    //useContext
    const proyectosContext = useContext(proyectoContext)
    const {formularioNuevoPaciente, guardarFormularioNuevoPaciente,mostrarListarPacientes,mostrarLista,listaPacientes,guardarPermitirCambios,permitirCambios,guardarCambiarPaciente,cambiarPaciente,guardarPutIdPaciente,guardarPermitirDelete,permitirDelete,guardarDeletePaciente ,deletePaciente,guardarVerTurnos, verTurnos,guardarErrorDelete,errorDelete } = proyectosContext

    const mostrarFormulario = () =>{
        guardarFormularioNuevoPaciente(true)
        guardarCambiarPaciente(false)
        guardarPermitirCambios(false)
        guardarPermitirDelete(false)
        guardarDeletePaciente(false)
        guardarVerTurnos(false)
    }

    const onclick=(idPaciente, nombrePaciente, apellidoPaciente, obra_socialPaciente, emailPaciente, telefonoPaciente)=>{
        if(permitirCambios){
            guardarPermitirDelete(false)
            guardarFormularioNuevoPaciente(false)
            guardarCambiarPaciente(true)
            guardarPermitirCambios(false)

            guardarPutIdPaciente({
                id:parseInt(idPaciente),
                nombre:nombrePaciente,
                apellido:apellidoPaciente,
                obra_social:obra_socialPaciente,
                email:emailPaciente,
                telefono:telefonoPaciente
            })
            
            

        }else if(permitirDelete){
            guardarPermitirCambios(false)
            guardarFormularioNuevoPaciente(false)
            guardarPermitirDelete(false)
            guardarDeletePaciente(true)
        }
            guardarPutIdPaciente({
                id:parseInt(idPaciente),
                nombre:nombrePaciente,
                apellido:apellidoPaciente,
                obra_social:obra_socialPaciente,
                email:emailPaciente,
                telefono:telefonoPaciente
            })
            
        
    }

    const onClickEditar = () =>{
        guardarPermitirCambios(true)
        guardarPermitirDelete(false)
        guardarFormularioNuevoPaciente(false)
        guardarDeletePaciente(false)
        guardarVerTurnos(false)
    }
    
    const onClickEliminar = () =>{
        guardarPermitirDelete(true)
        guardarCambiarPaciente(false)
        guardarPermitirCambios(false)
        guardarFormularioNuevoPaciente(false)
        guardarVerTurnos(false)
    }

    const onClickVerTurnos = () => {
        guardarVerTurnos(true)
        guardarPermitirCambios(false)
        guardarPermitirDelete(false)
        guardarFormularioNuevoPaciente(false)
        
    }


    return ( 
    
    <Fragment>
    <button
        onClick={() => mostrarListarPacientes()}
    >apretar</button>
        
        {mostrarLista
        ?
        <Fragment>
                <header >
                        <h1 className='m-5'>Pacientes actuales</h1>
                </header>
                
                

                <div className='container-flex' >

                <main className="container-main">
                    
                <div className='col-11'>
                <table  className="table table-striped table-hover col-5 ">
                    <tbody>
                        <tr>
                            <th> Nombre</th>
                            <th>Apellido</th>
                            <th>Obra social</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Documento</th>
                        </tr>
                    </tbody>
                    <tbody>
                    {listaPacientes.map(lista =>(
                        <tr key={lista.id}
                            onClick={(e =>onclick(lista.id,lista.nombre, lista.apellido, lista.obra_social, lista.email, lista.telefono))}
                            >
                            
                            <td >{lista.nombre}</td>
                            <td>{lista.apellido}</td>
                            <td>{lista.obra_social}</td>
                            <td>{lista.email}</td>
                            <td>{lista.telefono}</td>
                            <td>{lista.documento}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button
                    className='btn btn-block btn-success col-3'
                    onClick={() => mostrarFormulario()}
                > Agregar Paciente</button>
                <button
                    className='btn col-2 m-1  btn-success btn-block'
                    type='button'
                    onClick={onClickEditar}
                > Editar Paciente</button>
                
                <button
                    className='btn col-3  m-1 btn-danger btn-block'
                    type='button'
                    onClick={onClickEliminar}
                > Eliminar Paciente</button>

                <button
                    className='btn col-2 m-0 btn-info btn-block'
                    type='button'
                    onClick={onClickVerTurnos}
                > Ver turnos </button>

                </div>    
            </main>

            <aside className='aside'>

            {formularioNuevoPaciente ? <NuevoPaciente />   : null}
            {cambiarPaciente? <PutPaciente />     :null}
            {deletePaciente ? <EliminarPaciente />   : null}
            {permitirCambios ? <h4>Haga click en el paciente que desea modificar</h4>   : null}
            {permitirDelete ? <h4>Haga click en el paciente que desea eliminar</h4>   : null}
            {verTurnos ? <Turnos />   :null}
            {errorDelete ? <Error  mensaje='El paciente que desea eliminar tiene turnos programados'/>:null} 

            </aside>
        </div>
        </Fragment>
        : null} 


    </Fragment>
    )
    
     
}
 
export default Pacientes;
