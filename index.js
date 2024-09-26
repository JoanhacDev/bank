console.clear();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connection = require('./db/conexion.js');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let isLoggedIn = false;

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (isLoggedIn && req.path === '/') {
        return res.redirect(303, '/menu');
    }
    next();
});

app.get('/', (req, res) => {
    if (isLoggedIn) {
        res.redirect(303, '/menu');
    } else {
        res.render('index');
    }
});

app.post('/login', (req, res) => {
    const cc = parseInt(req.body.cc);
    const pass = req.body.pass;
    // console.log(cc, pass);
    const consulta = `SELECT CC, password FROM trabajadores WHERE CC = ${cc} AND password = '${pass}'`;
    connection.query(consulta, [cc, pass], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            isLoggedIn = true;
            res.redirect('/menu');
        } else {
            res.redirect('/');
            console.log('No Verificado');
        }
    });
    
});

app.get('/menu', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/menu');
    } else {
        res.redirect(303, '/');
    }
});

app.get('/menu/register', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/register');
    } else {
        res.redirect(303, '/');
    }
});

app.get('/logout', (req, res) => {
    isLoggedIn = false;
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});