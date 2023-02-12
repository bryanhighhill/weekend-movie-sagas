const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// router.get('/', (req, res) => {
//   // Add query to get all genres
//   const query = `SELECT * FROM "genres" ORDER BY "title" ASC`;
//   pool.query(query)
//     .then( result => {
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('ERROR: Get all movies', err);
//       res.sendStatus(500)
//     })
// });

router.get('/:id', (req, res) => {
  console.log('req params id: ', req.params.id)
  const query = `SELECT "movies"."title", "genres"."name" AS "genres" FROM "movies"
    JOIN "movies_genres" ON "movies_genres"."movie_id" = "movies"."id"
    JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
    WHERE "movies"."id" = $1;`;
  pool.query(query, [req.params.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});



module.exports = router;