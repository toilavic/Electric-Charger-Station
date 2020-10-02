const express = require('express');
const db = require('../database/db');
const router = express.Router();

//  Return all dog information 
router.get('/', (req, res) => { 
    db.query('SELECT * FROM user').then(results => {
        res.json({ users: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

//  Return information of a single user
router.get('/:userId', (req, res) => {
    db.query('SELECT * FROM user where id = ?', [req.params.userId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

// Create a new user
router.post('/', (req, res) => {

    db.query('INSERT INTO user (username, password) VALUES (?,?)', [req.body.username, req.body.password])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });
    
});

router.delete('/:userId', (req, res) => {
    db.query('DELETE FROM user where id = ?', [req.params.userId])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;
