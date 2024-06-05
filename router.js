//CARGAR MODULOS
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// INICIAR RUTAS
const router = express.Router();

// CONFIGURACION DE CONECCION MYSQL
const configConnection = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

// console.log(configConnection);

const connection = mysql.createConnection(configConnection);


let departamentos= [];	

const selectTipos = "SELECT departamento FROM team GROUP BY departamento;"
connection.query(selectTipos, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        departamentos = result
    }
    
})

router.get('/', (req, res) => {
    // console.log("los depas", departamentos);
    const selectAll = `SELECT * FROM team`
    connection.query(selectAll, (err, result) => {
        // console.log(result);
        if (err) {
            console.log(err);
        } else {
        // console.log("resultado", result);
        res.render('index', { result, departamentos })
    }
    });
});

router.get('/departamento/:depa', (req, res) => {
    const {depa} = req.params;
    const select = `SELECT * FROM team WHERE departamento = '${depa}'`;
    connection.query(select, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            if(result.length === 0) {
                res.render('error', {h2 : "No existe este departamento", result, departamentos});
            }
        res.render('index', { result, departamentos});
        };
    });
});



router.get('/team/:nombre', (req, res) => {
    const nom = req.params.nombre;
    const select = `SELECT * FROM team WHERE nombre = '${nom}'`;
    connection.query(select, (err, result) => {
        // console.log("Resultado de la query team/nombre", result);
        if(err) {
            console.log(err);
        }else {
            if(result.length === 0) {
                res.render('error', {result, departamentos});
            }
        res.render('index', { result, departamentos});
        };
    });
});

module.exports = { router, departamentos };