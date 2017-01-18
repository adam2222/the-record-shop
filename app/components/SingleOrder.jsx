import React from 'react'
import { connect } from 'react-redux'

const orderList = ({ orders }) => {
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
    order: state.orders.singleOrder
  }
}

export default connect(mapStateToProps)(orderList)
