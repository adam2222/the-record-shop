import React from 'react';

export default function (props) {

    return (
        <div>
            <div className="panel panel-default checkout-login">
                <div className="panel-heading">Signup</div>
                <div className="row">
                        <label htmlFor="email-entry">E-mail Address</label>
                        <div className="input-group email inline-block">
                            <input type="text" className="form-control" id="email-entry" placeholder="E-mail Address'"></input>
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