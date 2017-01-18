import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'
import { login } from 'APP/app/reducers/auth'
import store from 'APP/app/store'

export default class Checkout extends React.Component {

    constructor (props) {
        super(props)
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
        this.handleOrder = this.handleOrder.bind(this)
        this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this)
    }

    handleLoginSubmit () {
        const firstName = this.firstNameInput.value
        const lastName = this.lastNameInput.value
        const email = this.emailInput.value
        const password = this.pwInput.value

        login(email, password)
    }

    handlePaymentSubmit () {
        const card_number = this.card_number.value
        const expiration_month = this.expiration_month.value
        const expiration_year = this.expiration_year.value
        const ccv = this.ccv.value

        const billing_address = this.billing_address.value
        const billing_city = this.billing_city.value
        const billing_state = this.billing_state.value
        const billing_zip = this.billing_zip.value

        const userId = this.props.params.userId

        axios.post(`/api/users/${userId}/purchaseDetails`, {
            card_number, expiration_month, expiration_year, ccv, billing_address, billing_city, billing_state, billing_zip
        })
        .catch(err => console.error(err))
    }

    handleOrder (event) {
        const { makeNewOrder, cart } = this.props
        const orderInformation = {
            total: cart.reduce((total, item) => {
                return total + (item.cost * item.shopping_cart_items.quantity)}, 0),
            items: [ ...cart ]
        }
        makeNewOrder(+this.props.routeParams.userId, orderInformation)
    }

    render () {
        const totalCost = this.props.cart.reduce((total, item) => {
            return total + (item.cost * item.shopping_cart_items.quantity)}, 0)
        return (
            <div>
                <div className="panel panel-default checkout-login">
                    <div className="panel-heading">Login</div>
                    <div className="panel-body">
                        <p>If you have an account, enter your account information below. Otherwise, simply click "Sign Up" in the top right of your screen. Your cart will be waiting for you when you get back!</p>
                    </div>
                    <div className="row">
                        <div className="col-md-2 checkout-firstName">
                            <label htmlFor="first-name-entry">First Name</label>
                            <div className="input-group inline-block">
                                <input type="text" className="form-control" id="first-name-entry" placeholder="e.g., Harry'" ref={(input) => {this.firstNameInput = input}}></input>
                            </div>
                        </div>
                        <div className="col-md-2 checkout-lastName">
                            <label htmlFor="last-name-entry">Last Name</label>
                            <div className="input-group inline-block">
                                <input type="text" className="form-control" id="last-name-entry" placeholder="e.g., Potter'" ref={(input) => {this.lastNameInput = input}}></input>
                            </div>
                        </div>
                        <div className="col-md-2 checkout-email">
                            <label htmlFor="email-entry">E-mail Address</label>
                            <div className="input-group inline-block">
                                <input type="text" className="form-control" id="email-entry" placeholder="E-mail Address'" ref={(input) => {this.emailInput = input}}></input>
                            </div>
                        </div>
                        <div className="col-md-2 checkout-password">
                            <label htmlFor="password-entry">Password</label>
                            <div className="input-group inline-block">
                                <input type="text" className="form-control" id="password-entry" placeholder="Password" ref={(input) => {this.pwInput = input}}></input>
                            </div>
                        </div>
                        <div className="col-md-2 checkout-login-button">
                            <button type="button" className="btn cart-btn btn-success" onClick={() => store.dispatch(login(this.emailInput.value, this.pwInput.value))}>Log In</button>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
                <div className="panel panel-default checkout-payment">
                    <div className="panel-heading">EXTREMELY SECURE PAYMENT</div>
                    <div className="panel-body">
                        <p>If you're ready to check out, enter your info into our patent-pending EXTREMELY SECURE PAYMENT system below</p>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-2 checkout-ccn">
                                <label htmlFor="ccn">Credit Card Number</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="ccn" ref={(input) => {this.card_number = input}} placeholder="e.g., 1234-5678-9012-3456'"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-expiration-month">
                                <label htmlFor="expiration-month">Expiration Month</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="expiration-month" ref={(input) => {this.expiration_month = input}} placeholder="e.g., 09"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-expiration-year">
                                <label htmlFor="expiration-year">Expiration Year</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="expiration-year" ref={(input) => {this.expiration_year = input}} placeholder="e.g., 2016"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-ccv">
                                <label htmlFor="ccv">Security Code</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="ccv" ref={(input) => {this.ccv = input}} placeholder="Check the back of your card"></input>
                                </div>
                            </div>
                            <div className="col-md-4">
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 checkout-billing-address">
                                <label htmlFor="billing-address">Billing Address</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="billing-address" ref={(input) => {this.billing_address = input}} placeholder="e.g., 123 Fake Street'"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-billing-city">
                                <label htmlFor="billing-city">Billing City</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="billing-city" ref={(input) => {this.billing_city = input}} placeholder="e.g., Fakeburg'"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-billing-state">
                                <label htmlFor="billing-state">Billing City</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="billing-state" ref={(input) => {this.billing_state = input}} placeholder="e.g., Illinois'"></input>
                                </div>
                            </div>
                            <div className="col-md-2 checkout-billing-zip">
                                <label htmlFor="billing-zip">Billing ZIP Code</label>
                                <div className="input-group inline-block">
                                    <input type="text" className="form-control" id="billing-zip" ref={(input) => {this.billing_zip = input}} placeholder="e.g., 12345'"></input>
                                </div>
                            </div>
                            <div className="col-md-2 payment-submit-button">
                                <button type="button" onClick={this.handlePaymentSubmit} className="btn cart-btn btn-success">Submit Payment Method</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Your Purchase</h3>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="headings">
                                <th className="col-md-3">Album</th>
                                <th className="col-md-3">Artist</th>
                                <th className="col-md-3">Quantity</th>
                                <th className="col-md-3">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.cart && this.props.cart.map(album => (
                                <tr key={album.id}>
                                    <td>{album.title}</td>
                                    <td>{album.artist}</td>
                                    <td>{album.shopping_cart_items.quantity}</td>
                                    <td>${album.cost * album.shopping_cart_items.quantity}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td><strong><h4>GRAND TOTAL:</h4></strong></td>
                            <td><strong><h4 className="grand-total">${totalCost}</h4></strong></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-2 go-back-button">
                        <Link to={`/${this.props.params.userId}/cart`}><button type="button" className="btn cart-btn btn-secondary">Go Back to Cart</button></Link>
                    </div>
                    <div className="col-md-2 checkout-button">
                        <Link to={`/${this.props.params.userId}/checkout/confirm`}><button type="button" onClick={this.handleOrder} className="btn cart-btn btn-success">Confirm Purchase</button></Link>
                    </div>
                </div>
            </div>
        )

    }
}
