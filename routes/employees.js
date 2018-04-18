const express = require('express');
const router = express.Router();
const db = process.knex;
const request = require('request');

/* GET users listing. */
router.get('/', (req, res, next) => {
  db('employees').select()
  .then(emps => {
    res.render('browse', {emps});
  });
});

router.get('/:id', (req, res, next) => {
  db('employees').select()
  .where('id', Number(req.params.id))
  .then(results => {
    res.render('read', {employee: results[0]});
  });
});

router.get('/add', (req, res, next) => {
  res.render('add');
});

router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;


});

module.exports = router;
