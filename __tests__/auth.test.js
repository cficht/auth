require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const User = require('../lib/models/User');

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

  it('signs a user up', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'Chris', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Chris',
          __v: 0
        });
      });
  });

});
