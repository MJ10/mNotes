const express = require('express');
const mongojs = require('mongojs');
const config  = require('../config/config');

let router = express.Router();
let db = mongojs(config.database, ['notes']);

router.get('/user/:id', (req, resp, next) => {
    db.notes.findOne({ uid: req.params.id}, (err, user) => {
        if(err) {
            resp.send(err);
        }
        resp.json(user);
    });
});

router.put('/user/:id', (req, resp, next) => {
    let user_upd = req.body;

    if(!user_upd) {
        resp.status(400);
        resp.json({
            "error": "bad data"
        });
    } else {
        db.notes.update({ uid: req.params.id }, user_upd, {}, (err, data) => {
            if(err) {
                resp.send(err);
            }
            resp.json(data);
        });
    }
});

router.post('/user/add', (req, resp, next) => {
    let user = req.body;

    if(!user) {
        resp.status(400);
        resp.json({
            "error": "bad data"
        });
    } else {
        db.notes.save(user, (err, user) => {
            if(err)
            resp.send(err);
            resp.json(user);
        });
    }
});

module.exports = router;