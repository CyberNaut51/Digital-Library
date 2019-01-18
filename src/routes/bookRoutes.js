const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected correctly to database server');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const books = await col.find().toArray();
          res.render(
            'booksListView', {
              nav,
              title: 'Library',
              books,
            },
          );
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';
    
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('connected correctly to database server');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          console.log(book);
          res.render(
            'bookView', {
              nav,
              title: 'Library',
              book,
            }
          );
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
      
    });
  return bookRouter;
}

module.exports = router;
