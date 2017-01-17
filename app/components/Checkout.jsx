import React from 'react';

export default function (props) {

    const cart = props.cart

    return (
        <div className="row">
            <div className="panel panel-default checkout-login">
                <div className="panel-heading">Login</div>
                <div className="panel-body">
                    <p>If you have an account, enter your account information below. Otherwise, simply enter your e-mail and a password to easily create a new account</p>
                </div>
                <div className="row">
                    <div className="col-md-2 checkout-email">
                        <label htmlFor="email-entry">E-mail Address</label>
                        <div className="input-group email inline-block">
                            <input type="text" className="form-control" id="email-entry" placeholder="E-mail Address'"></input>
                        </div>
                    </div>
                    <div className="col-md-2 checkout-password">
                        <label htmlFor="password-entry">Password</label>
                        <div className="input-group password inline-block">
                            <input type="text" className="form-control" id="password-entry" placeholder="Password"></input>
                        </div>
                    </div>
                    <div className="col-md-2 checkout-button">
                        <button type="button" className="btn cart-btn btn-success">Log In/Register</button>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        </div>
    )
}