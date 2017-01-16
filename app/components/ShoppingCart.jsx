import React from 'react';

export default function (props) {

    const cart = props.cart
    const handleChange = props.handleChange

    return (
        <div id="shopping-cart">
            <div className="panel panel-default container">
                <div className="panel-heading">Shopping Cart</div>
                <table className="table">
                    <thead>
                        <tr className="headings">
                            <th>Album</th>
                            <th>Artist</th>
                            <th>Cost per Album</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
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
                                        <input type="text" className="form-control" value={album.quantity_ordered} onChange={handleChange}></input>
                                    </div>
                                </td>
                                <td>${album.cost * album.shopping_cart_items.quantity}</td>
                                <td>
                                    <div className="close-icon"></div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>       
    )
}