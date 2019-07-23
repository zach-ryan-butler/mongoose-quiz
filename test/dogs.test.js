require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Dog = require('../lib/models/dog');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a dog', () => {
    return request(app)
      .post('/api/v1/dogs')
      .send({ name: 'oakley', breed: 'pit bull' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'oakley',
          breed: 'pit bull',
          __v: 0
        });
      });
  });

  it('can get all dogs', async() => {
    const dogs = await Dog.create([
      { name: 'oakley', breed: 'pit bull' }
    ]);

    const dogsJSON = JSON.parse(JSON.stringify(dogs));

    return request(app)
      .get('/api/v1/dogs')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'oakley',
          breed: 'pit bull',
          __v: 0
        }]);
      });
  });

  it('can get a dog by id', async() => {
    const dog = await Dog.create({
      name: 'oakley',
      breed: 'pit bull'
    });

    return request(app)
      .get(`/api/v1/dogs/${dog._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: dog.name,
          breed: dog.breed,
          __v: 0
        });
      });
  });

  it('can update a dog by id', async() => {
    const dog = await Dog.create({
      name: 'oakley',
      breed: 'pit bull'
    });

    return request(app)
      .put(`/api/v1/dogs/${dog._id}`)
      .send({ name: 'spot', breed: 'black lab' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'spot',
          breed: 'black lab',
          __v: 0
        });
      });
  });

  it('can delete a dog by id', async() => {
    const dog = await Dog.create({
      name: 'oakley',
      breed: 'pit bull'
    });

    return request(app)
      .delete(`/api/v1/dogs/${dog._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: dog.name,
          breed: dog.breed,
          __v: 0
        });
      });
  });
});
