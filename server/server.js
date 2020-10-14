const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors())

passport.use(new Strategy((username, password, cb) => {
  db.query('SELECT id, username, password FROM user WHERE username = ?', [username]).then(dbResults => {

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
  db.query('SELECT id, username FROM user').then(results => {
    res.json(results);
  })
})

app.get('/users/:id',
        passport.authenticate('basic', { session: false }),
        (req, res) => {
          db.query('SELECT id, username FROM user WHERE id = ?', [req.params.id]).then(results => {
            res.json(results);
          })
        });

app.post('/users', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  if((typeof username === "string") &&
     (username.length > 4) &&
     (typeof password === "string") &&
     (password.length > 6))
  {
    bcrypt.hash(password, saltRounds).then(hash =>
      db.query('INSERT INTO user (username, password) VALUES (?,?)', [username, hash])
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


/* DB init */
Promise.all(
  [
      db.query(`CREATE TABLE IF NOT EXISTS user(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(32),
          password VARCHAR(256)
      )`)
      // Add more table create statements if you need more tables
  ]
).then(() => {
  console.log('database initialized');
  app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));