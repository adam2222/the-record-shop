import React from 'react'
import { connect } from 'react-redux'

const ordersList = ({ orders }) => {
  console.log(orders)
  return (
    <div>
      Hello World
    </div>
  )
}


/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = (state) => {
  return {
    orders: state.orders.userOrders
  }
}

export default connect(mapStateToProps)(ordersList)
