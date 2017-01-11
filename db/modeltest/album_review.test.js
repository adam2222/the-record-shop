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
    review_text: "In its newly remastered and rereleased incarnation, Trent Reznor's 1999 magnum opus The Fragile scrapes the sky like never before. Its companion, a reworking called Deviations 1, is mostly a curio.",
    review_stars: 4
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
     * Your model should have two fields (both required): `review_text` and `review_stars`.
     *
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations
     */
    it('includes `review_text` and `review_stars`', function () {

      return review.save()
      .then(function (result) {
        expect(result.review_text).to.equal("In its newly remastered and rereleased incarnation, Trent Reznor's 1999 magnum opus The Fragile scrapes the sky like never before. Its companion, a reworking called Deviations 1, is mostly a curio.")
        expect(result.review_stars).to.equal(4)
      })

    })

    it('requires `review_text`', function () {

      review.review_text = null

      return review.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('review_text cannot be null')
      })

    })

    it('requires `review_stars`', function () {

      review.review_stars = null

      return review.validate()
      .then(function(result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('review_stars cannot be null')
      })

    })

  })
})