const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// const SELECT_ALL_USERS_QUERY = `SELECT * FROM user`;

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

// app.get('/users', (req, res) => {
//     connection.query(SELECT_ALL_USERS_QUERY, (err,results) => {
//         if(err) {
//             return res.send(err)
//         }
//         else {
//             return res.json({
//                 data: results
//             })
//         }
//     })
// });

app.get('/users', (req, res) => {
    connection.query("SELECT * FROM USER",
        (err, result) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                    data: result
                })
            }
        }
    );
})

///////REGISTER///////////////////////
app.post('/users/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query("INSERT INTO user (username, password) VALUES(?,?)", [username, password],
        (err, result) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.send('Register Successful')
            }
        }
    );
})

///////LOGIN///////////////////////
app.post('/users/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query("SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if(err) {
                return res.send(err)
            }
            if(result.length <= 0) {
                return res.send({message: "Incorrect!!!"})
                }
            else {
                return res.json({
                    result
                })
            }
        }
    );
})

app.post('/users/delete', (req, res) => {
    const username = req.body.username;
    connection.query("DELETE FROM user WHERE username = ?",
    [username], (err, result) => {
        res.send("delete")
            if(err) {
                return res.send(err)
            }
            console.log("number of records deleted: " + result.affectedRows);
    })
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});