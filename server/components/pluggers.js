const express = require('express');
const db = require('../db');
const router = express.Router();

//  Return all plug information
router.get('/', (req, res) => {
    db.query('SELECT * FROM plugger').then(results => {
        res.json({ pluggers: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//  Return information of a single plug
router.get('/:plugId', (req, res) => {
    db.query('SELECT * FROM plugger where id = ?', [req.params.plugId])
    .then(results => {
        res.json(results);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})


router.post('/', (req, res) => {

    db.query('INSERT INTO plugger (chargerName, AddressLine1, Town, Latitude, Longitude, Comments, Title, Type,Code,Status ) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [req.body.chargerName, req.body.AddressLine1, req.body.Town, req.body.Latitude, req.body.Longitude, req.body.Comments, req.body.Title,req.body.Type, req.body.Code,req.body.Status])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });

});

router.delete('/:plugID', (req, res) => {
    db.query('DELETE FROM plugger where id = ?', [req.params.plugID])
    .then(results => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;