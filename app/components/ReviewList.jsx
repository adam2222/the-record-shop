import React from 'react'

const ReviewList = ({ selectedAlbum, reviews }) => {

  const listOfReviews = reviews.map(review => {
    var starCons = []
    for (let i = 1; i <= review.stars; i++) {
      starCons.push(
        <span key={ i } className="glyphicon glyphicon-star" style={{color: 'yellow'}} />
      )
    }
    return (
      <li key={review.id}>
        <div>
          {starCons}
        </div>
        <div>
           Description: {review.description}
        <hr />
        </div>
      </li>
    )
  })

  return (
    <div className="text-center">
      <h2> Customer Reviews </h2>
      <hr />
      <ul className="list-unstyled">
        { listOfReviews }
      </ul>
    </div>
  )
}

export default ReviewList
