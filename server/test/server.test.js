'use strict';

var request = require('supertest');

describe('Loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../bin/dev');
  });

  afterEach(function () {
    server.close();
  });

  it('accessing an unknown entry point should trigger a 404 response', function testPath(done) {
    request(server)
      .get('hjhjlkhlkm/foo/bar')
      .expect(404, done);
  });
});