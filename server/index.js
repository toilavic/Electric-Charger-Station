const express = require('express');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var pluggers = require('./components/pluggers');

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors())
app.use('/pluggers', pluggers)
passport.use(new Strategy((username, password, cb) => {
  db.query('SELECT id, username, password FROM users WHERE username = ?', [username]).then(dbResults => {

    if(dbResults.length == 0)
    {
      return cb(null, false);
    }

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        cb(null, dbResults[0]);
      }
      else
      {
        return cb(null, false);
      }
    })

  }).catch(dbError => cb(err))
}));



app.get('/hello-unprotected',
        (req, res) => res.send('Hello World!'));

app.get('/hello-protected',
        passport.authenticate('basic', { session: false }),
        (req, res) => res.send('Hello Protected World!'));


app.get('/users', (req, res) => {
  db.query('SELECT id, username FROM users').then(results => {
    res.json(results);
  })
})

app.get('/history/:id',
        // passport.authenticate('basic', { session: false }),
        (req, res) => {
          db.query('SELECT username, time, location, energy, money  FROM history WHERE id = ?', [req.params.id]).then(results => {
            res.json(results);
          })
        });

app.get('/users/:username',
   passport.authenticate('basic', { session: false }),
 (req,res) => {
  db.query('SELECT id, username FROM users WHERE username = ?', [req.params.username]).then (results => {
    res.json(results);
    console.log(results)
  })
})
app.post('/users', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let money = 0
  if((typeof username === "string") &&
     (username.length > 4) &&
     (typeof password === "string") &&
     (password.length > 6))
  {
    bcrypt.hash(password, saltRounds).then(hash =>
      db.query('INSERT INTO users (username, password, money) VALUES (?,?,?)', [username, hash, money])
    )
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
  }
  else {
    console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
    res.sendStatus(400);
  }
})

app.put('/users/:id',(req, res) => {
    db.query('UPDATE users SET money = ? WHERE users.id = ?', [req.body.money, req.params.id]).then(results => {
      res.json(results)
    }).catch(error => res.sendStatus(500))
})

app.post('/users/:id', (req,res) => {
    db.query('INSERT INTO history (id, username, time, location, energy, money) VALUES (?,?,?,?,?,?)', [req.params.id, req.body.username, req.body.time, req.body.location, req.body.energy, req.body.money])
})

/* DB init */
Promise.all(
  [
      db.query(`CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(32) UNIQUE, 
          password VARCHAR(256),
          money FLOAT(3)
      )`),
      db.query(`CREATE TABLE IF NOT EXISTS history(
          id INT,
          username VARCHAR(32),
          time VARCHAR(55),
          location VARCHAR(55),
          energy VARCHAR(255),
          money FLOAT(3)
      )`),
      db.query(`CREATE TABLE IF NOT EXISTS plugger(
         id INT AUTO_INCREMENT PRIMARY KEY,
         chargerName VARCHAR(255),
         AddressLine1 VARCHAR(255),
         Town VARCHAR(255),
         Latitude DECIMAL(7,5),
         Longitude DECIMAL(7,5),
         Comments VARCHAR(255),
         Title VARCHAR(255),
         Type VARCHAR(255),
         Code INT,
         Status VARCHAR(255)
      )`)
  ]
).then(() => {
  console.log('database initialized');
  app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));
