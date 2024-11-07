

const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
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

/* Variables globales */
let valid = false;
let datosUsuario;
let cc;
let msgError = false
let msgSuccessRegister = false
let msgSuccessUpdate = false
let msgSuccessDelete = false

/* VISTA LOGIN */
app.get('/', (req, res) => {
    if (isLoggedIn) {
        res.redirect(303, '/menu');
    } else {
        res.render('index', { error: msgError });
    }
});

app.post('/login', (req, res) => {
    const cc = parseInt(req.body.cc);
    const pass = req.body.pass;
    // console.log(cc, pass);
    const consulta = `SELECT CC, password FROM trabajadores WHERE CC = ${cc} AND password = '${pass}'`;
    connection.query(consulta, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            isLoggedIn = true;
            res.redirect('/menu');
        } else {
            res.redirect('/');
            msgError = true;
            console.log('No Verificado');
        }
    });

});

/* VISTA MENU */

app.get('/menu', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/menu', { successRegister: msgSuccessRegister, successUpdate: msgSuccessUpdate, successDelete: msgSuccessDelete });
        msgSuccessRegister = false
        msgSuccessUpdate = false
        msgSuccessDelete = false
        msgError = false
    } else {
        res.redirect(303, '/');
    }
});

/* VISTA REGISTRAR */

app.get('/menu/register', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/register');
    } else {
        res.redirect(303, '/');
    }
});

app.post('/menu/register/validating', (req, res) => {
    const cc = parseInt(req.body.cc);
    const name = req.body.name;
    const lastName = req.body.lastName;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const maritalStatus = req.body.maritalStatus;
    const accountType = req.body.accountType;
    const accountNumber = req.body.accountNumber;
    const password = req.body.pass;
    const balance = parseFloat(req.body.balance);
    const openingDate = req.body.openingDate;

    const consulta = "INSERT INTO clientes(CC,first_name,last_name,birth_date,gender,address,phone,email,marital_status,account_type,account_number,account_password,balance,account_open_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(consulta, [cc, name, lastName, birthdate, gender, address, phone, email, maritalStatus, accountType, accountNumber, password, balance, openingDate], (error, results) => {
        if (error) throw error;
        console.log('Registro exitoso');
        msgSuccessRegister = true
        res.redirect('/menu');
    });
})

/* VISTA ACTUALIZAR */
app.get('/menu/update', (req, res) => {
    if (isLoggedIn) {
        valid = false
        res.render('pages/update', { valid: valid, error: msgError });
    } else {
        res.redirect(303, '/');
    }
});
app.post('/menu/update/validating', (req, res) => {
    if (isLoggedIn) {
        cc = parseInt(req.body.cc);
        const consulta = `SELECT *, DATE_FORMAT(birth_date, '%Y-%m-%d') as birth,DATE_FORMAT(account_open_date, '%Y-%m-%d') as account_open FROM clientes WHERE CC = ${cc} `;
        connection.query(consulta, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                datosUsuario = results[0];
                valid = true
                msgError = false
                res.redirect('/menu/update/validated')
            } else {
                console.log("No se encuentra la cédula");
                msgError = true
                valid = false
                res.redirect('/menu/update')
            }
        });
    } else {
        res.redirect(303, '/');
    }
})

app.get('/menu/update/validated', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/update', { valid: valid, error: msgError, datos: datosUsuario });
    } else {
        res.redirect(303, '/');
    }
});
app.post('/menu/update/updating', (req, res) => {
    if (isLoggedIn) {
        const name = req.body.name;
        const lastName = req.body.lastName;
        const birthdate = req.body.birthdate;
        const gender = req.body.gender;
        const address = req.body.address;
        const phone = req.body.phone;
        const email = req.body.email;
        const maritalStatus = req.body.maritalStatus;
        const password = req.body.pass;
        const consulta = 'UPDATE clientes SET first_name = ?, last_name = ?, birth_date = ?, gender = ?, address = ?, phone = ?, email = ?, marital_status = ?, account_password = ? WHERE CC = ?';
        connection.query(consulta, [name, lastName, birthdate, gender, address, phone, email, maritalStatus, password, cc], (error, results) => {
            if (error) throw error;
            if (results.affectedRows === 1) {
                console.log('Actualización exitosa');
                msgSuccessUpdate = true
                res.redirect('/menu');
            } else {
                console.log('Problemas al actualizar');
                valid = false
                res.redirect('/menu');
            }
        });
    } else {
        res.redirect(303, '/');
    }
})

/* VISTA ELIMINAR */
app.get('/menu/delete', (req, res) => {
    if (isLoggedIn) {
        valid = false
        res.render('pages/delete', { valid: valid, error: msgError });
    } else {
        res.redirect(303, '/');
    }
});

app.post('/menu/delete/validating', function (req, res) {
    if (isLoggedIn) {
        cc = parseInt(req.body.cc);

        const consulta = `SELECT *, DATE_FORMAT(birth_date, '%Y-%m-%d') as birth,DATE_FORMAT(account_open_date, '%Y-%m-%d') as account_open FROM clientes WHERE CC = ${cc} `;

        connection.query(consulta, function (error, results, fields) {
            if (error) {
                console.error('Error al validar usuario:', error);
                res.status(500).send('Error al buscar el usuario');
                return;
            }
            console.log(results)
            if (results.length == 1) {
                datosUsuario = results[0];

                valid = true
                msgError = false
                res.redirect('/menu/delete/validated')

            } else {
                console.log("No se encuentra la cédula");
                msgError = true
                valid = false
                console.log(msgError)
                res.redirect('/menu/delete')
            }
        });
    } else {
        res.redirect(303, '/');
    }

});

app.get('/menu/delete/validated', (req, res) => {
    if (isLoggedIn) {
        res.render('pages/delete', { valid: valid, datos: datosUsuario, error: msgError });
    } else {
        res.redirect(303, '/');
    }
})

app.post('/menu/delete/deleting', (req, res) => {

    const consulta = `DELETE FROM clientes WHERE CC = ${cc}`
    connection.query(consulta, function (error, results, fields) {
        console.log(results)
        if (error) {
            return error;
        }
        if (results.affectedRows == 1) {

            console.log("Se ha eliminado correctamente")
            msgSuccessDelete = true
            res.redirect('/menu')

        } else {
            console.log("Opps");
            valid = false
            res.redirect('/menu')
        }
    });

});

app.get('/salir', (req, res) => {
    isLoggedIn = false;
    msgError = false
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('pages/404');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});