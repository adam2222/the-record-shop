import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
const NEW_ORDER = 'NEW_ORDER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

/* -----------------    ACTION CREATORS    ------------------ */

export const findOrders = (allOrders) => {
  return {
    type: GET_ORDERS,
    allOrders
  }
}

const findOrdersForUser = (userOrders) => {
  return {
    type: GET_USER_ORDERS,
    userOrders
  }
}

const createNewOrder = (newOrder) => {
  return {
    type: NEW_ORDER,
    newOrder
  }
}

const findSingleOrder = (singleOrder) => {
  return {
    type: GET_ORDER,
    singleOrder
  }
}


/* -----------------    DISPATCHERS     ------------------ */

export const loadOrders = () => dispatch => {
  axios.get(`/api/orders`)
  .then(response => dispatch(findOrders(response.data)))
  .catch(err => console.error('unable to load orders', err))
}

export const getSingleOrder = (userId, orderId) => dispatch => {
  axios.get(`/api/orders/${userId}/orders/${orderId}`)
  .then(response => dispatch(findSingleOrder(response.data)))
  .catch(err => console.error('unable to load single order', err))
}

export const makeNewOrder = (userId, orderInfo) => dispatch => {
  axios.post(`/api/orders/${userId}`, orderInfo)
  .then(response => dispatch(createNewOrder(response.data)))
  .catch(err => console.error('unable to create new order', err))
}

export const getUserOrders = (userId) => dispatch => {
  axios.get(`/api/orders/${userId}`)
  .then(response => dispatch(findOrdersForUser(response.data)))
  .catch(err => console.error('unable to load single order', err))
}


/* -----------------    REDUCER     ------------------ */

const reducer = (state = {singleOrder: {}, userOrders: [], allOrders: []}, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_USER_ORDERS:
      newState.userOrders = action.userOrders
      break
    case NEW_ORDER:
      newState.allOrders = [action.newOrder, ...state.allOrders]
      break
    case GET_ORDER:
      newState.singleOrder = action.singleOrder
      break
    default:
      return state
  }
  return newState
}

export default reducer
