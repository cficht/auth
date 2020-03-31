require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('message routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a message if logged in', async() => {
    const newUser = await User.create({ username: 'Chris', password: 'abc123' });
    const token = newUser.authToken();
    return request(app)
      .post('/api/v1/messages')
      .set('Authorization', token)
      .send({ message: 'Test' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          message: 'Test',
          __v: 0
        });
      });
  });

  it('gets an error if posting without being logged in', async() => {
    return request(app)
      .post('/api/v1/messages')
      .send({ message: 'Test' })
      .then(res => {
        expect(res.body).toEqual({
          'message': 'jwt must be provided',
          'status': 500
        });
      });
  });
});
