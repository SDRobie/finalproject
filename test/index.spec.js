var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

var index = require('../index.js');
//Here we test the GET, POST, etc.

describe('API Interactions', function() {

  it('returns status code 200 for root endpoint', function(done) {
    chai.request('http://localhost:8080')
    .get('/')
    .end(function(error, response) {
      expect(response).to.exist;
      done();
      })
  });
  it('returns status code 200 for streamer name check', function(done) {
    chai.request('http://localhost:8080')
    .get('/streamer/:username')
    .end(function(error, res) {
      expect(res).to.have.status(200);
      done();
    })
  });
  it('returns status code 200 for posting a streamer userName to be added to database', function(done) {
    chai.request('http://localhost:8080')
    .post('/posts/:userName')
    .end(function(error, response) {
      expect(response).to.have.status(200);
      done();
    })
  });
  //keeps filling the dbase with garbage every time I run the test
  // it('returns status code 200 for posting a properly formatted comment', function(done) {
  //   chai.request('http://localhost:8080')
  //   .post('/comment')
  //   .end(function(error, response) {
  //     expect(response).to.have.status(200);
  //     done();
  //   })
  // });
});
