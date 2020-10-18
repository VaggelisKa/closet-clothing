import React, { Component } from 'react'

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

export class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnSubmit = (event) => {
        event.preventDefault();

        this.setState({email: '', password: ''});
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleOnSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="email"
                        required
                    />
                    <FormInput 
                        type="password"
                        name="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required 
                    />
                    <div className="buttons">
                        <Button type="submit" value="Submit Form">Sign in</Button>
                        <Button isGoogleSignIn={true} onClick={signInWithGoogle}>Sign in with Google</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
