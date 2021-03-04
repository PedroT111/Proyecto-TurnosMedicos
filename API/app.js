const express= require("express");
const mysql = require('mysql');
const util = require('util');

const app= express();
const port= process.env.PORT || 3000;


app.use(express.json());


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
            let nombre = req.body.nombre;
            let apellido = req.body.apellido;
            let matricula= req.body.matricula;
            let especialidad = req.body.especialidad;

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
            let nombre = req.body.nombre;
            let apellido = req.body.apellido;
            let matricula = req.body.matricula;
            let especialidad = req.body.especialidad;
            let id = req.params.id;

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



//Pacientes
    
    //POST
    //GET
    //GET id
    //PUT
    //DELETE
    




//Turnos

    //POST
    //GET
    //GET id
    //PUT
    //DELETE











































app.listen(port, ()=>{
    console.log("Escuchando en puerto", + port)
})
