import React from 'react';

export default function ShoppingCart (props) {
    let cart = props.cart
    const allAlbums = props.allAlbums

    cart = cart.map(item => {
        item.albumDetails = allAlbums.filter(album => album.id === item.id)[0]
        return item
    })

    return (
        <div id="shopping-cart">
            <div className="panel panel-default">
                <div className="panel-heading">Shopping Cart</div>
                <table className="table">
                    <thead>
                        <tr className="headings">
                            <th>Album</th>
                            <th>Artist</th>
                            <th>Cost per Album</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cart && cart.map(album => (
                             <tr id={album.albumDetails.id}>
                                <td>{album.albumDetails.title}</td>
                                <td>{album.albumDetails.artist}</td>
                                <td>${album.albumDetails.cost}</td>
                                <td>
                                    <div className="input-group quantity-input">
                                        <input type="text" className="form-control" value={album.quantity}></input>
                                    </div>
                                </td>
                                <td>${album.albumDetails.cost * album.quantity}</td>
                                <td>
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