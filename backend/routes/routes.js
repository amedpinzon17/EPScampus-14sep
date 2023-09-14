const express = require('express');

const {MongoClient} = require('mongodb');
require('dotenv').config();
const router = express.Router();
const bases = process.env.MONGO_URL;
const nombreBase = 'EPS_Campus_14sep'

  


/* 1. Obtener todos los pacientes de manera alfabética. */
router.get('/punto1', async(req, res) => {
    try{
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('usuario');
        const result = await collection.find().sort({nombre : 1}).toArray();
        res.json(result);
        client.close();
    }catch(err){
            console.log(err);
        }
});


/* 2. Obtener las citas de una fecha en específico , donde se ordene los pacientes de manera alfabética. */

router.get('/punto2', async(req, res) => {
    try{
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('cita');
        const fechaEspecifica = '17/06/2022';
        const result = await collection.find({citFecha : fechaEspecifica}).sort({datosUsuario : 1}).toArray();
        res.json(result);
        client.close();
    }catch(err){
            console.log(err);
            res.status(500).json({ err: 'Hubo un problema al obtener las citas' });
        }
});


/* 3. Obtener todos los médicos de una especialidad en específico (por ejemplo, ‘Cardiología’). */


router.get('/punto3', async(req, res) => {
    try{
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('medico');
        const especialiMed = 'Cardiología'
        const result = await collection.find({especialidad : especialiMed.medNombre}).toArray();
        res.json(result);
        client.close();
    }catch(err){
            console.log(err);
            res.status(500).json({ err: 'Hubo un problema al obtener la especialidad' });
        }
});


/* 4. Encontrar la próxima cita para un paciente en específico (por ejemplo, el paciente con **user_id 1**). */

router.get('/punto4', async(req, res) => {
    try{
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('cita');
        const fechaEspecifica = '22/05/2023';
        const result = await collection.find({citFecha : fechaEspecifica})
            .sort({ citFecha: 1 }) .limit(1).toArray();

        if (result.length === 0) {
            res.json({ mensaje: 'No se encontraron próximas citas para este paciente.' });
        } else {
            res.json(result[0]);
        }


        res.json(result);
        client.close();
    }catch(err){
            console.log(err);
            res.status(500).json({ err: 'Hubo un problema al obtener las citas' });
        }
});




module.exports = router;