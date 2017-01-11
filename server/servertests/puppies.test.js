const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Album = require('APP/db/models/album')
const app = require('APP/server/start')


describe('Album API', () => {
    it('gets all albums', () => 
        request(app)
        .get('/api/albums')
        .expect('Content-Type', /json/)
        .expect(200)
    )
    it('gets one album', () => 
        request(app)
        .get('/api/albums/1')
        .expect('Content-Type', /json/)
        .expect(200, res => {
            res.body.id = 1;
        })
    )
    it('gets all albums of one breed', () => 
        request(app)
        .get('/api/albums/jazz')
        .expect('Content-Type', /json/)
        .expect(200)
    )
})

