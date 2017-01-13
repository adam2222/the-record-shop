const db = require('APP/db')
const app = require('APP/server/start')
const request = require('supertest-as-promised')
const {expect} = require('chai')
const User = require('APP/db/models/user')
const Album = require('APP/db/models/album')
const ShoppingCartItem = require('APP/db/models/shopping_cart_items')
const Promise = require('bluebird')

const dummyAdminAcct = {
  firstName: "Iam",
  lastName: "Anadmin",
  email: "cooladminemail@admin.com",
  isAdmin: true,
}

function login (request, done) {
  request
    .send(theAccount)
}

describe('User API', () => {

  describe('see other users', () =>
    it('-- GET / fails 401 (Unauthorized) when not logged in as admin', () =>
      request(app)
            // Add test for auth here
        .get(`/api/users`)
        .expect(401)
    ),
    it('-- GET / returns 200 (Successful) when logged in as admin', () =>
      request(app)
        .get('/api/users')
        .expect(200)
    )
  )

  describe('see one other user', () =>
    it('-- GET /:userId fails 401 (Unauthorized) when not logged in as admin', () =>
      request(app)
        // Add test for auth here
        .get('/api/users/1')
        .expect(401)
    ),
    it('-- GET /:userId returns 200 (Successful) when logged in as admin', () =>
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
    it('-- POST creates a user when logged in as admin', () =>
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
    it('-- POST missing required info results in 500', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org'
        })
        .expect(500)
    )
  )

  describe('promoting users to admin', () =>
    it('-- an admin can promote another user to admin', () =>
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
    it('-- when logged in as an admin, DELETE /:userId deletes a user', () =>
      request(app)
        .delete('/api/users/1')
        .then(function (res) {
          return request(app)
            .get('/api/users/1')
            .expect(404)
        })
    )
  )

  describe('shopping cart', function(){

    beforeEach(function(){
        const user = User.create({
          id: 1,
          firstName: 'Adam',
          lastName: 'Intrator',
          email: 'adam@adam.adam',
          password_digest: 'pass',
          password: 'pass',
          DOB: '1980/4/3'
      })

        const album = Album.create({
          id: 1,
          title: 'Bad',
          artist: 'Michael Jackson',
          genre: 'Pop',
          release_year: 1986,
          description: 'Awesome!',
          cost: 10,
          quantity_available: 1
      })

      return Promise.all([user, album])
      .spread((user, album) => {
          return ShoppingCartItem.create({
              quantity: 1,
              user_id: user.id,
              album_id: album.id
          })
      })
    })



    describe('adding to cart', function(){
      it('returns json of added item', function(){
        request(app)
        // .get('/api/users/1/')
        .put('/api/users/1/cart')
        .send({
          album_id: 1,
          quantity: 1
        })
        .expect(200)
        .then(function(res) {
          expect(res.body.album_id).to.equal('2')
          expect(res.body.quantity).to.equal('1')
          expect(res.body.user_id).to.equal('1')
        })
      })
    })

    // afterEach(function () {
    //   return Promise.all([
    //     ShoppingCartItem.truncate({ cascade: true })
    //   ])
    // })
 })


  // PASSWORD RESET TEST -- ASK HOW TO DO THIS
  // describe('triggering password reset', () =>
  //   it('When logged in as an admin, can prompt a user to reset his/her password', () =>
  //     request(app)
  //       .put('/api/users/1')
  //        ?????
  //   )
  // )

//   describe('')
//     it('POST redirects to the user it just made', () =>
//     request(app)
//         .post('/api/users')
//         .send({
//         email: 'eve@interloper.com',
//         password: '23456',
//         })
//         .redirects(1)
//         .then(res => expect(res.body).to.contain({
//         email: 'eve@interloper.com'
//         }))
//     )
// })
})
