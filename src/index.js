//api rest
const express = require('express');
const app = express();
const morgan=require('morgan');
 
//Configuraciones
app.set('port', process.env.PORT || 2727);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    // Otros encabezados y configuraciones CORS según sea necesario
    next();
});
 
//Nuestro primer WS Get
app.get('/name', (req, res) => {    
    res.json(
        {
            "Name": "Quim"
        }
    );
})
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});