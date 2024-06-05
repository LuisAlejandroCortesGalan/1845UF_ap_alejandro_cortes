//CARGAR MODULOS
const express = require('express');
// CARGAR RUTAS
const {router, departamentos} = require('./router.js');

//CREAMOS LA APLICACION 
const app = express();

//DEFINIMOS PUERTO
const port = process.env.PORT || 3000;

//DEFINIMOS EL MOTOR DE LA PLANTILLA
app.set('view engine', 'ejs');

//CONFIGURAMOS BODY-PARSER  (esta vez con express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DEFINIMOS LA CARPETA DE LOS FICHEROS ESTATICOS
app.use(express.static(__dirname + '/public'));

// USAR RUTAS
app.use(router)

//DEFINIR QUE HACER EN CASO DE ERROR
app.use((req, res )=> {
    res.status(404).render('error', { departamentos });
 });

//PONEMOS LA APLICACION A ESCUCHAR  
app.listen(port, () => {
    console.log(`escuchando en el puerto = http://localhost:${port}`);
});


