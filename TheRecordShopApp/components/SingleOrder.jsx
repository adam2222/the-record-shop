import React from 'react'
import { connect } from 'react-redux'

const orderList = ({ order }) => {



  return (
    <div>
      <h2>Order Id {order.id}</h2>
      <div className="panel panel-default">
        <div className="panel-heading">Your order from {order.date_created}</div>
        <div className="panel-body"></div>



        <ul className="list-group">
          <li className="list-group-item">Status: {order.status}</li>
          <li className="list-group-item">Date Created: {order.date_created}</li>
          <li className="list-group-item">Date Shipped: {order.date_shipped}</li>
          <li className="list-group-item">Date Delivered: {order.date_delivered}</li>
          <li className="list-group-item">Albums Purchased:
            <ul className="list-group">
              {order.items && order.items.map(item => {

                  return (
                    <li key={item.id} className="list-group-item">{item.title}: {item.quantity}</li>
                  )
                })
              }

          </ul></li>
          <li className="list-group-item">Grand Total: ${order.total}</li>
        </ul>

      </div>
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
