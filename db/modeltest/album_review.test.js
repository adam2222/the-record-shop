'use strict'

const db = require('APP/db')
const AlbumReview = require('../models/album_review')
const {expect} = require('chai')


describe('The `Album Reviews` model', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */

  before('wait for the db', () => db.didSync)

  /**
   * Next, we create an (un-saved!) album review instance before every spec
   */
  var modelBody = {
    description: "In its newly remastered and rereleased incarnation, Trent Reznor's 1999 magnum opus The Fragile scrapes the sky like never before. Its companion, a reworking called Deviations 1, is mostly a curio.",
    stars: 4
  }

  var review
  beforeEach(function(){
    review = AlbumReview.build(modelBody)
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      AlbumReview.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `description` and `stars`.
     *
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations
     */
    it('includes `description` and `stars`', function () {

      return review.save()
      .then(function (result) {
        expect(result.description).to.equal("In its newly remastered and rereleased incarnation, Trent Reznor's 1999 magnum opus The Fragile scrapes the sky like never before. Its companion, a reworking called Deviations 1, is mostly a curio.")
        expect(result.stars).to.equal(4)
      })

    })

    it('requires `description`', function () {

      review.description = null

      return review.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('description cannot be null')
      })

    })

    it('requires `stars`', function () {

      review.stars = null

      return review.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('stars cannot be null')
      })

    })

  })
})
