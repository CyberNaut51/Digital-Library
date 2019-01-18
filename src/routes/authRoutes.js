const express = require('express');

const { MongoClient } = require('mongodb');

const authRouter = express.Router();

function router() {
  authRouter.route('/signup')
    .post((req, res) => {
      console.log(req.body);
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
      res.json(req.body);
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    })    
  return authRouter;
}
module.exports = router;