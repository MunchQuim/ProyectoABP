//api rest
const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');
const cors = require('cors');


const app = express();
const morgan = require('morgan');

//Configuraciones
app.set('port', process.env.PORT || 2727);
app.set('json spaces', 2)

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    // Otros encabezados y configuraciones CORS según sea necesario
    next();
});

//Nuestro primer WS Get
app.get('/get', async (req, res) => {  // en este caso   recibiremos un json de la tabla empleados

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * from quimcitos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

});
app.get('/get/:id', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const itemId = parseInt(req.params.id);
        const result = await connection.execute('SELECT * from quimcitos where id = ' + itemId);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
app.post('/create', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        // Prepara la sentencia SQL
        const sql = `INSERT INTO quimcitos VALUES (sec_quimcitos_id.nextval, :name)`;

        // Ejecuta la sentencia SQL con los valores proporcionados en la solicitud
        const result = await connection.execute(sql, {
            name: req.body.name
        }, {
            autoCommit: true // Realiza un commit automáticamente después de la inserción
        });

        // Libera la conexión
        await connection.close();

        // Responde con un mensaje de éxito
        res.status(201).json({ mensaje: 'Registro agregado con éxito' });
    } catch (error) {
        console.error('Error al agregar el registro:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});
app.put('/update/:campo', async (req, res) => {  // en este caso   recibiremos un json de la tabla empleados

    try {
        const connection = await oracledb.getConnection(dbConfig);
        // Prepara la sentencia SQL
        /*
        {
            "id": 43,
            "campo": "Patricio"
        }
        */
        const pCampo = req.params.campo;
        const sql = 'UPDATE quimcitos SET ' + pCampo + ' = :campo WHERE id = :id';
        // Ejecuta la sentencia SQL con los valores proporcionados en la solicitud
        const result = await connection.execute(sql, {
            id: req.body.id,
            campo: req.body.campo//lo que hay en el json
        }, {
            autoCommit: true // Realiza un commit automáticamente después de la inserción
        });

        // Libera la conexión
        await connection.close();

        // Responde con un mensaje de éxito
        res.status(201).json({ mensaje: 'Registro actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el registro:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

});
app.delete('/delete', async (req, res) => {  // en este caso   recibiremos un json de la tabla empleados

    try {
        const connection = await oracledb.getConnection(dbConfig);
        // Prepara la sentencia SQL
        const sql = 'DELETE FROM quimcitos WHERE id = :id';

        // Ejecuta la sentencia SQL con los valores proporcionados en la solicitud
        const result = await connection.execute(sql, {
            id: req.body.id
        }, {
            autoCommit: true // Realiza un commit automáticamente después de la inserción
        });

        // Libera la conexión
        await connection.close();

        // Responde con un mensaje de éxito
        res.status(201).json({ mensaje: 'Registro eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});