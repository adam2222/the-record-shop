import React from 'react'

const Stars = (props) => {
  let averageRating = []
  for (let i = 1; i <= props.rating; i++) {
    averageRating.push(
      <span key={ i } className="glyphicon glyphicon-star" style={{color: 'yellow'}} />
    )
  }
  return (
    <div>
      { averageRating }
    </div>
  )
}

export default Stars
