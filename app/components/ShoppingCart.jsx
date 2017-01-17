import React from 'react';
import { Link } from 'react-router'

export default function (props) {

    const cart = props.cart
    const handleQuantityChange = props.handleQuantityChange
    const handleRemove = props.handleRemove
    const handleRemoveAll = props.handleRemoveAll
    const handleCheckout = props.handleCheckout

    return (
        <div id="shopping-cart">
            <div className="panel panel-default container">
                <div className="panel-heading">
                    <h3 className="panel-title">Shopping Cart</h3>
                </div>
                <table className="table">
                    <thead>
                        <tr className="headings">
                            <th className="col-md-4">Album</th>
                            <th className="col-md-3">Artist</th>
                            <th className="col-md-3">Cost per Album</th>
                            <th className="col-md-2" id="quantity-bar">Quantity</th>
                            <th className="col-md-2">Subtotal</th>
                            <th className="col-md-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cart && cart.map(album => (
                            <tr key={album.id}>
                                <td>{album.title}</td>
                                <td>{album.artist}</td>
                                <td>${album.cost}</td>
                                <td>
                                    <div className="input-group quantity-input">
                                        <input type="text" className="form-control" value={album.shopping_cart_items.quantity} onChange={(evt) => handleQuantityChange(album.id, props.params.userId, evt)}></input>
                                    </div>
                                </td>
                                <td>${album.cost * album.shopping_cart_items.quantity}</td>
                                <td>
                                    <div className="remove-icon" onClick={(evt) => handleRemove(album.id, props.params.userId, evt)}></div>
                                </td>
                            </tr>
                        ))
                    }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong><h4>GRAND TOTAL:</h4></strong></td>
                            <td><strong><h4>${props.total}</h4></strong></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <div className="cart-button-box text-center col-md-12">
                        <button type="button" className="btn cart-btn btn-secondary">Update Cart</button>
                        <Link to={`/${props.params.userId}/checkout`}><button type="button" className="btn cart-btn btn-success">Check Out</button></Link>
                        <button type="button" className="btn cart-btn btn-danger" onClick={(evt) => handleRemoveAll(cart[0].shopping_cart_items.user_id, evt)}>Clear Cart</button>
                    </div>
                </div>
            </div>
        </div>       
    )
}