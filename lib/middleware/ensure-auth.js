const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.cookies.session || req.get('Authorization');
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
