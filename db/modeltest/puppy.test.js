'use strict'

const db = require('APP/db')
const Puppy = require('../models/puppy')
const {expect} = require('chai')


describe('The `Puppy` model', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */

  before('wait for the db', () => db.didSync)

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */
  var modelBody = {
    name: 'buddy',
    cost: 9.99,
    size: 'small',
    imageUrl: 'www.image.jpeg'
  }

  var puppy
  beforeEach(function(){
    puppy = Puppy.build(modelBody)
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Puppy.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations
     */
    it('includes `name`, `name` and `size` fields', function () {

      return puppy.save()
      .then(function (saviedPup) {
        expect(saviedPup.name).to.equal('buddy')
        expect(saviedPup.cost).to.equal(9.99)
        expect(saviedPup.size).to.equal(modelBody.size)
      })

    })

    it('requires `name`', function () {

      puppy.name = null

      return puppy.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('name cannot be null')
      })

    })

    it('requires `imageUrl` (in a more strict way than for `name`)', function () {

      puppy.imageUrl = 'puppies'

      return puppy.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })

    })

    it('provides a default data value for breed if none is specified', function() {
      return puppy.save()
      .then(function(savedPuppy) {
        expect(savedPuppy.breed).to.equal('Unknown')
      })
    })

   it('can handle long `description`', function() {

      var puppyDescription = 'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.';

      return Puppy.create({
        name: 'rex',
        breed: 'pug',
        description: puppyDescription,
        imageUrl: 'pug.com',
        cost: 100
      })
      .then(function(result) {
        expect(result).to.be.an('object');
        expect(result.breed).to.equal('pug');
        expect(result.description).to.equal(puppyDescription);
      });
    })
  })
})
