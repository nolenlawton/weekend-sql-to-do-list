const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET endpoint for incomplete
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to-do_table" ORDER BY "isCompleted" ASC`;
    pool.query(queryText)
        .then((result) => {
            const rows = result.rows
            console.log('My Rows:',result.rows);
            res.send(rows);
        })
        .catch((error) => {
            console.log(`error getting tasks`, error);
            res.sendStatus(500);
        })
});

// GET endpoint for completed
router.get('/byCompletion', (req, res) => {
    let queryText = 'SELECT * FROM "to-do_table" ORDER BY "isCompleted" DESC';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
  });

// POST endpoint
router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
        INSERT INTO "to-do_table" ("task", "isCompleted")
        VALUES ($1, $2);
    `;
    const queryParams = [
        newTask.task,             // $1
        newTask.isCompleted             // $2
    ]

    pool.query(queryText, queryParams)
        .then((result) => {
            console.log("added task");
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        })
});

// DELETE endpoint
router.delete('/:id', (req, res) => {
    const queryText = `
        DELETE FROM "to-do_table"
        WHERE id = $1;
    `;
    const queryParams = [req.params.id];

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            console.log('deleted task')
            res.sendStatus(204);    // "No Content" 😶
        })
        .catch((err) => {
            console.log('DELETE /task/:id failed', err);
            res.sendStatus(500);
        });
});

// PUT endpoint with completion date
router.put('/:id', (req, res) => {
    const queryText = `
        UPDATE "to-do_table"
        SET "isCompleted" = true, "completedDate" = $2
        WHERE id = $1;
    `;
    const queryParams = [
        req.params.id, // $1
        req.body.completionDate // $2
    ];

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(204);    // "No Content" 😶
        })
        .catch((err) => {
            console.log('PUT /task/:id failed', err);
            res.sendStatus(500);
        });
})

module.exports = router;