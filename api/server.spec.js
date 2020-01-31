const request = require('supertest');
const server = require('./server.js');

describe ('jokes', function() {
  it('runs the tests', function() {
    expect(true).toBe(true);
  })

  describe('GET /api/jokes', function() {
    // make a get request to /api/jokes/
    it("gets denied when not logged in", function() {
      return request(server).get('/api/jokes')
      .then(res => {
        // No access without logging in first
        expect(res.status).toBe(401);
      }) // then
    }) // it
  }) // describe get api jokes
}) // describe jokes

describe ('authorization', function() {

  it("can't 'get' login endpoint", function() {
    return request(server).get('/api/auth/login')
    .then(res => {
      expect(res.status).toBe(404);
    })
  })

  it("denies login by unknown user", function () {
    return request(server)
      .post('/api/auth/login')
      .send({
        username: "bob",
        password: "12345"
      })
      .then(res => {
        expect(res.status).toBe(401);
      })
  })

  it("rejects malformed post to /register", function () {
    return request(server).post('/api/auth/register')
    .then(res => {
      expect(res.status).toBe(500);
    })
  })

  it("accepts a new user", function () {
    return request(server)
      .post('/api/auth/register')
      .send({
        username: "tim",
        password: "password"
      })
    .then(res => {
      expect(res.status).toBe(201);
    })
  }) // it
}) // describe authorization