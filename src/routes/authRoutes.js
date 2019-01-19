/* eslint-disable comma-dangle */
const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected server correctly');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          debug('success fully inserted');
          // debug(results);

          req.login(results.ops[0], () => {
            // debug(err.message);
            debug(req.session);
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });
  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', {
        nav,
        title: 'sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      debug(req.ops);
      res.json(req.user);
    });
  authRouter.route('/signOut')
    .get((req, res) =>{
      req.logout(()=> debug('successfully logout '));
      res.redirect('/');
    });
  return authRouter;
}
module.exports = router;
