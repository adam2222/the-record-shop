const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('APP/server/start')

describe('/api/users', () => {

  describe('see other users', () => 
//   it('When not logged in as admin, GET / fails 401 (Unauthorized)', () =>
//     request(app)
          // Add test for auth here
//       .get(`/api/users`)
//       .expect(401)
//   )    
    it('When logged in as admin, GET / returns 200 (Successful)', () =>
      request(app)
        .get('/api/users')
        .expect(200)
    )
  )

  describe('see one other user', () => 
    // it('When not logged in as admin, GET /:userId fails 401 (Unauthorized)', () => 
    //   request(app)
    //     // Add test for auth here
    //     .get('/api/users/1')
    //     .expect(401)
    // ),
    it('When logged in as admin, GET /:userId returns 200 (Successful)', () =>
      request(app)
        .get('/api/users/1')
        .expect(200)
    )
  )
  
  describe('create an account', () => 
    // it('When not logged in as admin, POST fails 401 (Unauthorized', () =>
    //   request(app)
    //     .post('/api/users')
    //     // Add test for auth here
    //     .send({
    //       firstName: 'Beth',
    //       lastName: 'Davis',
    //       email: 'beth@secrets.org',
    //       password: '12345'
    //     })
    //     .expect(401)
    // )
    it('When logged in as admin, POST creates a user', () => 
      request(app)
        .post('/api/users')
        .send({
          firstName: 'Beth',
          lastName: 'Davis',
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    ),
    it('POST missing required info results in 400', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org'
        })
        .expect(401)
    )
  )

  describe('promoting users to admin', () => 
    it('When logged in, an admin can promote another user to admin', () =>
      request(app)
        .put('/api/users/1')
        .send({
          admin: 'true'
        })
        .expect(201)
    )
  )

  describe('deleting users', () => 
    // it('When not logged in or not an admin, DELETE /:userId fails 401 (Unauthorized)', () =>
    //   request(app)
    //     .delete('/api/users/1')
    //     .then(401)
    // )
    it('When logged in as an admin, DELETE /:userId deletes a user', () =>
      request(app)
        .delete('/api/users/1')
        .then(function (res) {
          return request(app)
            .get('/api/users/1')
            .expect(404)
        })
    )
  )

  // PASSWORD RESET TEST -- ASK HOW TO DO THIS
  // describe('triggering password reset', () => 
  //   it('When logged in as an admin, can prompt a user to reset his/her password', () =>
  //     request(app)
  //       .put('/api/users/1')
  //        ?????
  //   )
  // )

  // describe('')

  // describe('view puppies', () => {
  //   it('gets all puppies', () => 
  //     request(app)
  //       .get('/api/puppies')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //   )
  //   it('gets one puppy', () => 
  //     request(app)
  //       .get('/api/puppies/1')
  //       .expect('Content-Type', /json/)
  //       .expect(200, res => {
  //         res.body.id = 1;
  //       })
  //   )
  // })

  //   describe('')
  //     it('POST redirects to the user it just made', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'eve@interloper.com',
  //           password: '23456',
  //         })
  //         .redirects(1)
  //         .then(res => expect(res.body).to.contain({
  //           email: 'eve@interloper.com'
  //         }))        
  //     )
  // })
})