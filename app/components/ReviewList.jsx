import React from 'react'
import Stars from './Stars'

const ReviewList = ({ reviews }) => {

  const listOfReviews = reviews.map(review => {
    return (
      <li key={review.id}>
        <div>
          <Stars rating={review.stars} />
        </div>
        <div>
           Description: {review.description}
        <hr />
        </div>
      </li>
    )
  })

  return (
    <ul className="list-unstyled">
      { listOfReviews }
    </ul>
  )
}

export default ReviewList
