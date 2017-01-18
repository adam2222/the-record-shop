import React from 'react';
import axios from 'axios';
import { login } from 'APP/app/reducers/auth'

export default class Signup extends React.Component {

    constructor (props) {
        super(props)

        this.handleRegistation = this.handleRegistration.bind(this)
    }

    handleRegistration () {
        axios.post('/api/users', {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            DOB: this.dob.value,
            password: this.password.value
        })
        .then((user) => store.dispatch(login(user.id, this.password.value)))
        .catch(err => console.error(err))
    }

    render () {
        return (
            <div className="container">
                <form>
                    <div className="form-group row">
                        <label htmlFor="first-name-entry">First Name</label>
                        <div className="input-group inline-block">
                            <input type="text" className="form-control" id="first-name-entry" placeholder="e.g., Bart'" ref={(input) => this.firstName = input}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="last-name-entry">Last Name</label>
                        <div className="input-group inline-block">
                            <input type="text" className="form-control" id="last-name-entry" ref={(input) => this.lastName = input} placeholder="e.g., Simpson'"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email-entry">E-mail</label>
                        <div className="input-group inline-block">
                            <input type="text" className="form-control" id="email-entry" ref={(input) => this.email = input} placeholder="e.g., bsimpson@springfield.com'"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dob-entry">Date of Birth</label>
                        <div className="input-group inline-block">
                            <input type="text" className="form-control" id="dob-entry" ref={(input) => this.dob = input} placeholder="e.g., MM/DD/YYYY'"></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password-registration-entry">Password</label>
                        <div className="input-group inline-block">
                            <input type="text" className="form-control" id="email-entry" ref={(input) => this.password = input} placeholder="e.g., bsimpson@springfield.com'"></input>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-3">
                        <button type="button" className="btn cart-btn btn-success" onClick={this.handleRegistration}>Sign Up</button>
                    </div>
                    </div>
                    <div className="col-md-9">
                    </div>
            </div>
        )
    }
}