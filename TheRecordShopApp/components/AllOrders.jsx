import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const ordersList = ({ orders }) => {
  const tableData = orders.map(order => {
    return (
      <tr key={order.id}>
        <th scope="row"><Link to={`/orders/${order.user_id}/${order.id}`}>{order.id}</Link></th>
        <td>{order.date_created}</td>
        <td>{order.status}</td>
        <td>{order.total}</td>
      </tr>
    )
  })

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Current Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>
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
