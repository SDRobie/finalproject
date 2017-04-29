var chai = require('chai');
var expect = chai.expect;

var capstone = require('./capstone.service');

describe('clientLogIn', () => {
  it('should be a function', () => {
    expect(capstone.clientLogIn).to.be.a('function');
  });
});

describe('fetchComments', () => {
  it('should be a function', () => {
    expect(capstone.fetchComments).to.be.a('function');
  });
  it('should return a json object', () => {
    expect(result.then).to.be.an('object');
  });
});

describe('fetchByType', () => {
  it('should be a function', () => {
    expect(capstone.fetchByType).to.be.a('function');
  });
  it('should return an object', () => {
    expect(result.then).to.be.an('object');
  });
});

describe('sortByType', () => {
  it('should be a function', () => {
    expect(capstone.sortByType).to.be.a('function');
  });
  it('should return an object', () => {
    expect(result.then).to.be.an('object');
  });
});

describe('subscriberFloat', () => {
  it('should be a function', () => {
    expect(capstone.subscriberFloat).to.be.a('function');
  });
  it('should return an object', () => {
    expect(result.then).to.be.an('object');
  });
});
