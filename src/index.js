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
        const result = await connection.execute('select * from "Departamentos" d join "Empleados" e on d."id_dept" = e.\"id_dept\"');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

});
app.get('/get/count', async (req, res) => {  // en este caso   recibiremos un json de la tabla empleados

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('select count(*) from "Empleados"');
        res.json(result.rows[0][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

});
app.get('/get/id/:id', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const itemId = parseInt(req.params.id);
        const result = await connection.execute(
        'select * from "Departamentos" d join "Empleados" e on d."id_dept" = e.\"id_dept\" join "Cargos" c on c.\"id_cargo\" = e.\"id_cargo\"  WHERE \"id_empleado\" = :itemId', [itemId], { outFormat: oracledb.OUT_FORMAT_OBJECT });
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
app.get('/get/departamentos', async (req, res) => {  

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('select * from "Departamentos"');
        const columnNames = result.metaData.map(column => column.name);
        
        const rowsWithColumnNames = result.rows.map(row => {
            const rowData = {};
            row.forEach((value, index) => {
                rowData[columnNames[index]] = value;
            });
            return rowData;
        });
    
        res.json(rowsWithColumnNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

});
app.get('/get/permisos', async (req, res) => {  

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('select r."id_dept", d."nombre_dept",e."tarjeta" from "Rel_Permisos" r JOIN "Empleados" e on e."id_empleado" = r."id_empleado" join "Departamentos" d on d."id_dept" = r."id_dept"');
        const columnNames = result.metaData.map(column => column.name);
        
        const rowsWithColumnNames = result.rows.map(row => {
            const rowData = {};
            row.forEach((value, index) => {
                rowData[columnNames[index]] = value;
            });
            return rowData;
        });
    
        res.json(rowsWithColumnNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

});
app.get('/get/permisos/:id', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const itemId = parseInt(req.params.id);
        const result = await connection.execute('select r."id_dept",r."id_empleado",d."nombre_dept" from "Rel_Permisos" r join "Departamentos" d ON d."id_dept" = r."id_dept" where r."id_empleado" = '+itemId);
        const columnNames = result.metaData.map(column => column.name);
        
        const rowsWithColumnNames = result.rows.map(row => {
            const rowData = {};
            row.forEach((value, index) => {
                rowData[columnNames[index]] = value;
            });
            return rowData;
        });
    
        res.json(rowsWithColumnNames);
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