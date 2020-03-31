const { Router } = require('express');
const Message = require('../models/Message');

module.exports = Router()
  .post('/', (req, res, next) => {
    Message
      .create(req.body)
      .then(message => res.send(message))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Message
      .find()
      .then(messages => res.send(messages))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Message
      .findById(req.params.id)
      .then(message => res.send(message))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Message
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(message => res.send(message))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Message
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(message => res.send(message))
      .catch(next);
  });
