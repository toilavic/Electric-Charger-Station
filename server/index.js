const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM user';

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
    const { username, password } = req.query;
    const INSERT_USERS_QUERY = `INSERT INTO user (username, password) VALUES('${username}', '${password}')`;
    connection.query(INSERT_USERS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('Register Successful')
        }
    });
});

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});