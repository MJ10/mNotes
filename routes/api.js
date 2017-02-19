const express = require('express');
const mongojs = require('mongojs');

let router = express.Router();
let db = mongojs('// paste your database link', ['// collection name eg.:notes']);

// Get all tasks
// router.get('/tasks', (req, resp, next) => {
//     db.tasks.find((err, tasks) => {
//         if(err) {
//             resp.send(err);
//         }
//         resp.json(tasks);
//     });
// });

// Get single task
router.get('/user/:id', (req, resp, next) => {
    db.notes.findOne({ uid: req.params.id}, (err, user) => {
        if(err) {
            resp.send(err);
        }
        resp.json(user);
    });
});

// Update task
router.put('/user/:id', (req, resp, next) => {
    var user_upd = req.body;

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
    var user = req.body;

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
