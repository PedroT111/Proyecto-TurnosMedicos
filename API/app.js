const express= require("express");
const mysql = require('mysql');
const util = require('util');
const cors = require("cors")

const app= express();

const port= process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


//CONEXIÓN CON LA BASE DE DATOS PHPMYADMIN
const conexion = mysql.createConnection({
    host: 'localhost',
	user: 'root',
	password: '',
	database: 'citapacientes'
});

conexion.connect((error)=>{
    if(error) {
        throw error;
    }

    console.log('Conexion con la base de datos mysql establecida');
});

//Implementación de util ---> para declarar "promises"
const qy = util.promisify(conexion.query).bind(conexion);


//Desarrollo


//Medico
    
    //POST
    app.post("/medico", async (req, res) => {
        try{
            let nombre = [req.body.nombre];
            let apellido = [req.body.apellido];
            let matricula= [req.body.matricula];
            let especialidad = [req.body.especialidad];

            let query = "SELECT * FROM medicos WHERE matricula = ?"

            if(nombre.length === 0|| apellido === 0 || matricula === 0 || especialidad === 0 ){ //No me toma el .lenght
                throw new Error ("Faltan completar datos")
            }

            if(!nombre || !apellido || !matricula || !especialidad){
                throw new Error ("Todos los campos son obligatorios");
            }
           
            let respuesta = await qy(query, [matricula]);

            if(respuesta.length > 0){
                throw new Error ("Ese médico ya se encuentra registrado")
            }

            query = "INSERT INTO medicos (nombre, apellido, matricula, especialidad) VALUES (?,?,?,?)"
            respuesta = await qy(query, [nombre, apellido, matricula, especialidad]);
            res.send({"respuesta": respuesta});
            res.status(200);
        }
        catch(e){
            console.error(e.message);   
            res.status(413).send({"Error": e.message})

        }
    })
    //GET
    app.get("/medico", async (req, res) => {
        try{
            const query = "SELECT * FROM medicos";
            let respuesta = await qy(query);
            res.send({"respuesta": respuesta});
            res.status(200);

        }
        catch(e){
            console.error(e.message);   
            res.status(413).send({"Error": e.message})

        }
    })

    //GET id
    app.get("/medico/:id", async (req, res) => {
        try{
            let id = req.params.id;
            
            const query = "SELECT * FROM medicos WHERE id = ?";
            const respuesta = await qy(query, [id]);

            if(respuesta.length === 0){
                throw new Error("Médico no encontrado")
            }

            res.send({"respuesta": respuesta});
            res.status(200);

        }
        catch(e){
            console.error(e.message);   
            res.status(413).send({"Error": e.message});

        }
    })

    //PUT
    app.put("/medico/:id", async (req, res) => {
        try{
            let nombre = [req.body.nombre];
            let apellido = [req.body.apellido];
            let matricula = [req.body.matricula];
            let especialidad = [req.body.especialidad];
            let id = [req.params.id];

            let query = "SELECT * FROM medicos WHERE id";
            let respuesta = await qy ( query, [id]) ;

            if(respuesta.length === 0){
                "No se encontró al medico"
            }

            if(nombre.length===0 || apellido.length === 0 || matricula.length === 0 || especialidad.length === 0) {
                throw new Error("Faltan completar datos");
            }

            if(!nombre || !apellido || !matricula || !especialidad){
                throw new Error("Todos los campos son obligatorios");
            }

            

            query = "UPDATE medicos SET nombre = ?, apellido = ?, matricula = ?, especialidad = ? WHERE id = ?"
            respuesta = await qy(query, [nombre, apellido, matricula, especialidad, id]);
            res.send({"respuesta" : "Los datos fueron actualizados"});
            res.status(200);

        }
        catch(e){
            console.error(e.message);   
            res.status(413).send({"Error": e.message});

        }
    })
    //DELETE

    app.delete("/medico/:id", async(req, res) => {
        try{
            let id = req.params.id;

        let query = "SELECT * FROM medicos WHERE id = ?";
        let respuesta = await qy(query, [id]);

        if(respuesta.length === 0){
            throw new Error("No se encuentra al médico")
        }

        query = "DELETE FROM medicos WHERE id = ?"
        respuesta = await qy(query, [id]);
        res.send({"respuesta" : "El medico fue eliminado"})
        res.status(200);

        }
        catch(e){
            console.error(e.message);   
            res.status(413).send({"Error": e.message});


        }
    })
    app.post('/pacientes', async (req , res) => {

        try{
                let nombre = req.body.nombre.toUpperCase() ;
                let apellido = req.body.apellido.toUpperCase() ;
                let obra_social = req.body.obra_social.toUpperCase() ;
                let email = req.body.email.toUpperCase() ;
                let telefono = req.body.telefono ;
                let documento = req.body.documento ;
                
                if(!nombre ||!apellido ||!obra_social ||!email ||!telefono ||!documento){
                    throw new Error('Falto enviar información')
                }
                if(nombre.trim().length== 0||apellido.trim().length== 0||obra_social.trim().length== 0||email.trim().length== 0||telefono.trim().length== 0 ||documento.trim().length== 0){
                    throw new Error('Se envio informacón vacia')
                }
                let query ='SELECT * FROM pacientes WHERE email = ?'
                let respuesta = await qy ( query,[email])
                if(respuesta.length > 0){
                    throw new Error ('Ya existe un paciente registrado con ese email')
                }

                query ='INSERT INTO pacientes(nombre, apellido, obra_social, email , telefono, documento) VALUE (?,?,?,?,?,?) '
                respuesta=await qy(query,[nombre,apellido, obra_social, email , telefono, documento ])
                res.status(200).send('Paciente creado con exito') ;
            }
            catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        }
        );

        app.get('/pacientes', async (req , res) => {

            try {
                    let query ='SELECT * FROM pacientes' ;
                    let respuesta= await qy( query)
                    res.status(200).send({'respuesta':respuesta}) ;
        
                
            } catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
            })

        app.get('/pacientes/:id', async ( req , res) => {
            try{
                let id = req.params.id ;

                let query = 'SELECT * FROM pacientes WHERE id = ? '
                let respuesta = await qy(query, [id])
                if(respuesta.length === 0){
                    throw new Error('La persona indicada no existe')
                }
                res.status(200).send({'respuesta':respuesta})
            }
            catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        app.put('/pacientes/:id', async ( req , res) => {
            try{
                let nombre = req.body.nombre.toUpperCase() ;
                let apellido = req.body.apellido.toUpperCase() ;
                let email = req.body.email.toUpperCase() ;
                let obra_social = req.body.obra_social.toUpperCase() ;
                let telefono = req.body.telefono.toUpperCase() ;
                let id = req.params.id ;
                
                if(nombre.trim().length== 0||apellido.trim().length== 0||obra_social.trim().length== 0||email.trim().length== 0||telefono.trim().length== 0){
                    throw new Error('No se envio la informacón necesaria')
                }

                let query ='SELECT * FROM pacientes WHERE email = ? AND id != ? '
                let respuesta = await qy (query,[email, id])
                if(respuesta.length > 0){
                    throw new Error('Ya existe una persona registrada con ese email')
                } 
                query = 'SELECT * FROM pacientes WHERE id = ?'
                respuesta= await qy (query, [id])
                if(respuesta.length === 0){
                    throw new Error('La persona indicada no existe')
                }
                
                query = 'UPDATE pacientes SET nombre = ?, apellido = ?, email =?, obra_social=?, telefono=? WHERE id =?  '
                respuesta= await qy(query , [nombre, apellido, email,obra_social,telefono,id])
                res.status(200).send('Modificación hecha con exito')

            }catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }

        })

        app.delete('/pacientes/:id', async ( req , res) => {
            try{
                let id = req.params.id ;

                let query = 'SELECT * FROM pacientes WHERE id = ?' ;
                let respuesta = await qy(query,[id]) ;
                if(respuesta.length === 0){
                    throw new Error('No se encontro a la persona que se quiere borrar')
                }
                query = 'SELECT * FROM citas WHERE pacienteId = ?'
                respuesta= await qy ( query ,[id])
                if(respuesta.length > 0){
                    throw new Error('No se puede eliminar al paciente, tiene turno programados')
                }

                query = 'DELETE FROM pacientes WHERE id = ?' ;
                respuesta= await qy ( query,[id]);
                res.status(200).send('Borrado exitoso')
            }catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        //CITAS
        app.get('/citas', async ( req, res ) =>{
            try {
                let query ='SELECT * FROM citas '
                let respuesta = await qy(query)
                if (respuesta.length === 0){
                    throw new Error('No hay citas programads')
                }
                res.status(200).send({'respuesta':respuesta})
                
            } catch (e) {
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        app.get('/citas/:id', async ( req , res) =>{
            try {
                let id = req.params.id

                let query = 'SELECT * FROM citas WHERE id= ? '
                let respuesta = await qy( query,[id])
                if(respuesta.length === 0){
                    throw new Error('No se encontro el turno indicado')
                }
                res.status(200).send({'respuesta':respuesta})
            } catch (e) {
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        app.post('/citas', async ( req , res) =>{

            try {
                let descripcion = req.body.descripcion.toUpperCase()
                let fecha = req.body.fecha
                let hora = req.body.hora
                let medicoID = req.body.medicoID
                let pacienteID = req.body.pacienteID

                if(!descripcion||!fecha||!hora||!medicoID||!pacienteID){
                    throw new Error('No se envio toda la información')
                }


                if(descripcion.trim().length===0||fecha.trim().length===0||hora.trim().length===0||medicoID.trim().length===0||pacienteID.trim().length===0){
                    throw new Error('Se envio información vacia')
                }

                let query ='SELECT * FROM medicos WHERE id = ? '
                let respuesta = await qy( query,[medicoID])
                if(respuesta.length === 0){
                    throw new Error('El medico indicado no existe')
                }

                query ='SELECT * FROM citas WHERE medicoID = ? AND hora = ? AND fecha = ?  '
                respuesta = await qy( query,[medicoID,hora, fecha ])
                if(respuesta.length > 0){
                    throw new Error ('El medico ya tiene un turno en ese horario y dia')
                }

                query = 'SELECT * FROM pacientes WHERE id =?'
                respuesta = await qy( query, [pacienteID])
                if(respuesta.length===0){
                    throw new Error('El paciente ingresado no existe')
                }

                query='INSERT INTO citas (descripcion, fecha, hora, medicoID, pacienteID) VALUE ( ?, ?, ?, ?, ?)'
                respuesta = await qy (query,[descripcion, fecha, hora, medicoID,pacienteID])
                res.status(200).send({'respuesta': respuesta })

            } catch (e) {
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }


            app.delete('/citas/:id', async ( req, res ) => {
                try {
                    let id = req.params.id

                    let query = 'SELECT * FROM citas WHERE id = ? '
                    let respuesta = await qy( query,[id])
                    if(respuesta.length === 0){
                        throw new Error('El turno indicado no existe')
                    }
                    query = 'DELETE FROM citas WHERE id = ?' ;
                    respuesta= await qy ( query,[id]);
                    res.status(200).send(' Cita borrado exitosamente')

                } catch (e) {
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message});
                }
            })

            app.put('/citas/:id', async ( req , res ) =>{
                try {
                    let descripcion = req.body.descripcion.toUpperCase()
                    let fecha = req.body.fecha
                    let hora = req.body.hora
                    let medicoID = req.body.medicoID
                    let pacienteID = req.body.pacienteID
                    let id = req.params.id

                    if(!descripcion||!fecha||!hora||!medicoID||!pacienteID){
                        throw new Error('No se envio la informacón solicitada')
                    }
                    if(descripcion.trim().length===0||fecha.trim().length===0||hora.trim().length===0||medicoID.trim().length===0||pacienteID.trim().length===0){
                        throw new Error('Se envio información vacia')
                    }
                    
                    let query = 'SELECT * FROM citas WHERE id = ? '
                    let respuesta =  await qy (query, [id] )
                    if(respuesta.length === 0){
                        throw new Error('No existe esa cita')
                    }

                    query ='SELECT * FROM medicos WHERE id = ?'
                    respuesta = await qy ( query, [medicoID])
                    if(respuesta.length === 0){
                        throw new Error('El medico indicado no existe')
                    }
                    
                    query = 'SELECT * FROM pacientes WHERE  id = ?'
                    respuesta = await qy (query,[pacienteID])
                    if(respuesta.length === 0){
                        throw new Error('El paciente indicado no existe')
                    }

                    query = 'SELECT * FROM citas WHERE  medicoID = ? AND hora = ? AND fecha = ?'
                    respuesta = await qy (query,[medicoID, hora , fecha])
                    if(respuesta.length > 0){
                        throw new Error('El medico ya tiene un turno reservado para esa hora')
                    }

                    query = 'SELECT * FROM citas WHERE  pacienteID = ? AND hora = ? AND fecha = ?'
                    respuesta = await qy (query,[pacienteID, hora , fecha])
                    if(respuesta.length > 0){
                        throw new Error('El paciente ya tiene un turno reservado para esa hora')
                    }

                    query = 'UPDATE citas SET descripcion = ?, fecha = ?, hora =?, medicoID=?, pacienteID=?  WHERE id =? '
                    respuesta = await qy (query,[descripcion, fecha, hora, medicoID, pacienteID, id ])
                    res.status(200).send({'respuesta':respuesta})

                } catch (e) {
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message})
                }
            })
        

        })





app.listen(port, ()=>{
    console.log("Escuchando en puerto", + port)
})
