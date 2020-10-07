const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS_QUERY = `SELECT * FROM user`;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_login'
});

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(express.json());
app.use(cors());

app.get('/',(req, res) => {
    res.send('Electric Charger Station')
});

app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_USERS_QUERY, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

///////REGISTER///////////////////////
app.get('/users/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const INSERT_USERS_QUERY = `INSERT INTO user (username, password) VALUES('${username}','${password}')`;
    connection.query(INSERT_USERS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('Register Successful')
        }
    });
});

app.post('/users/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const SELECT_USERNAME_QUERY = `SELECT id, username, password FROM user WHERE (username = '${username}', password = '${password}')`;
    const SELECT_USERNAME_QUERY = `SELECT id, username, password FROM user WHERE username = '${username}'`;
    connection.query(SELECT_USERNAME_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        if(results.length <= 0) {
            return res.send({message: "Incorrect!!!"})
            }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.post('/users/delete', (req, res) => {
    const username = req.body.username;
    const DELETE_USERNAME_QUERY = `DELETE FROM user WHERE username = '${username}'`;
    res.send("delete")
    connection.query(DELETE_USERNAME_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        console.log("number of records deleted: " + results.affectedRows);
    })
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});