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

            if(nombre == ""|| apellido == "" ||matricula == "" || especialidad == "" ){ //No me toma el .lenght
                throw new Error ("Faltan completar datos")
            }

            if(!nombre || !apellido || !matricula || !especialidad){
                throw new Error ("Todos los campos son obligatorios");
            }
           
            let query = "SELECT * FROM medicos WHERE matricula = ?"
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
    //PUT
    //DELETE



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
