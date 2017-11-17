import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_REVIEWS = 'GET_REVIEWS'
const CREATE_REVIEW = 'CREATE_REVIEW'

/* -----------------    ACTION CREATORS    ------------------ */

export const findReviews = (allReviews) => {
	return {
		type: GET_REVIEWS,
		allReviews
	}
}

export const addReview = (review) => {
	return {
		type: CREATE_REVIEW,
		review
	}
}



/* -----------------    DISPATCHERS     ------------------ */

export const loadReviews = (albumId) => dispatch => {
	axios.get(`/api/reviews/${albumId}/reviews`)
	.then(response => dispatch(findReviews(response.data)))
	.catch(err => console.error('unable to load reviews', err))
}
export const createReview = (albumId, newReview) => dispatch => {
	axios.post(`/api/reviews/${albumId}/reviews`, newReview)
	.then(response => dispatch(addReview(response.data)))
	.catch(err => console.error('unable to add review', err))
}



/* -----------------    REDUCER     ------------------ */

const reducer = (state = [], action) => {

	switch (action.type) {
		case GET_REVIEWS:
			return action.allReviews
		case CREATE_REVIEW:
			return [action.review, ...state] 
		default:
			return state
	}

}

export default reducer