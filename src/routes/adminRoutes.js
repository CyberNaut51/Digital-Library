/* eslint-disable comma-dangle */
const express = require('express');
const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const books = [
  {
    title: 'War And Peace',
    bookId: 656,
    read: false
  },
  {
    title: 'Les Miserables',
    Author: 'Victor Hugo',
    bookId: 24280,
    read: false
  },
  {
    title: 'The Time Machine',
    Author: 'H G Wells',
    bookId: 24280
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