const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Puppy = require('APP/db/models/puppy')
const app = require('APP/server/start')


describe('Puppy API', () => {
    it('gets all puppies', () => 
        request(app)
        .get('/api/puppies')
        .expect('Content-Type', /json/)
        .expect(200)
    )
    it('gets one puppy', () => 
        request(app)
        .get('/api/puppies/1')
        .expect('Content-Type', /json/)
        .expect(200, res => {
            res.body.id = 1;
        })
    )
    it('gets all puppies of one breed', () => 
        request(app)
        .get('/api/puppies/doberman')
        .expect('Content-Type', /json/)
        .expect(200)
    )
})

