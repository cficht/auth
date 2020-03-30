const { Router } = require('express');
const User = require('../models/User');

const oneDay = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          maxAge: oneDay,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  });
