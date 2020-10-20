import React, { Component } from 'react'

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { signInWithFacebook, signInWithGoogle, auth } from '../../firebase/firebase.utils';

import { FaGoogle } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'

import './sign-in.styles.scss'

export class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnSubmit = async (event) => {
        event.preventDefault();

        this.setState({email: '', password: ''});

        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
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
                    <div className="button">
                        <Button type="submit" value="Submit Form">Sign in</Button>
                    </div>
                    <div className="buttons">
                        <Button onClick={signInWithGoogle} cssClass={'google-sign-in'}><FaGoogle size="27px"/></Button>
                        <Button onClick={signInWithFacebook} cssClass={'facebook-sign-in'}><FaFacebookF size="27px"/></Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
