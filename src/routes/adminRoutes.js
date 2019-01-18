const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const books = [
  {
    title: 'Book1',
    Author: 'Harish',
  },
  {
    title: 'Book2',
    Author: 'Harish',
  },
  {
    title: 'Book3',
    Author: 'Harish',
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected correctly to database server');

          const db = client.db(dbName);

          const responce = await db.collection('books').insertMany(books);
          res.json(responce);
        } catch (err) {
          console.log(err);
        }
      }());
    });
  return adminRouter;
}

module.exports = router;