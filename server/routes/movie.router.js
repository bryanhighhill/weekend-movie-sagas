const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//PUT request to db to update movie at specified id
router.put('/', (req, res) => {
  console.log(`in PUT db with: ${req.body.title}, ${req.body.description}, ${req.body.id}`);
  const query = 'UPDATE "movies" SET "title"=$1, "description"=$2 WHERE "id"=$3;';
  pool.query(query, [req.body.title, req.body.description, req.body.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('ERROR with PUT request: ', err);
    })
});


//get request for all movies in db
router.get('/', (req, res) => {
  const query = `SELECT * FROM "movies" ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    });
});

//get request for movie at specified id in db
router.get('/:id', (req, res) => {
  console.log('in fetch movie get request with id: ', req.params.id);
  const id = req.params.id;
  const query = 'SELECT * FROM "movies" WHERE "id" = $1;';
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

//POST new movie to db
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;