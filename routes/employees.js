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

router.get('/add', (req, res, next) => {
  res.render('add');
});

router.get('/:id', (req, res, next) => {
  db('employees').select()
  .where('id', Number(req.params.id))
  .then(results => {
    res.render('read', {employee: results[0]});
  });
});

router.post('/add', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;

  request({url: "https://dog.ceo/api/breeds/image/random", json: true}, (err, response, body) => {
    if (body.status === "success") {
      const animal = body.message;
      db('employees').insert({name, email, animal}).returning('id')
      .then(results => {
        const url = (process.env.NODE_ENV === "development") ? `/employees/${results[0]}` : `/employees/${results[0].id}`;
        res.redirect(url);
      });
    } else {
      console.log("WTF?");
      res.redirect('/');
    }
  });
});

module.exports = router;
