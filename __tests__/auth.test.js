require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

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

  it('logs a user in', async() => {
    await User.create({ username: 'Chris', password: 'abc123' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'Chris', password: 'abc123' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Chris',
          __v: 0
        });
      });
  });

  it('fails login with a bad password', async() => {
    await User.create({ username: 'Chris', password: 'abc123' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'Chris', password: 'abc1234' })
      .then(res => {
        expect(res.body).toEqual({
          'message': 'Invalid username/password',
          'status': 403,
        });
      });
  });

});
