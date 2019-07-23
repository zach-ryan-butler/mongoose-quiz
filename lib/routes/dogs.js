const { Router } = require('express');
const Dog = require('../models/dog');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      breed
    } = req.body;

    Dog
      .create({ name, breed })
      .then(dog => res.send(dog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Dog
      .find()
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Dog 
      .findById(req.params.id)
      .then(dog => res.send(dog))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const {
      name,
      breed
    } = req.body;

    Dog
      .findByIdAndUpdate(req.params.id, { name, breed}, { new: true })
      .then(updatedDog => res.send(updatedDog))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Dog 
      .findByIdAndDelete(req.params.id)
      .then(deletedDog => res.send(deletedDog))
      .catch(next);
  });
