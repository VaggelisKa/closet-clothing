import React, { useState } from 'react'
import { connect } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';


import { FaGoogle } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'

import { googleSignInStart, facebookSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss'

const SignIn = ({ emailSignInStart, googleSignInStart, facebookSignInStart }) =>  {
    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        emailSignInStart(email, password)
    }

    const handleChange = (event) => {
        const {value, name} = event.target;

        setCredentials({...userCredentials, [name]: value});
    }


    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleOnSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    handleChange={handleChange}
                    label="email"
                    required
                />
                <FormInput 
                    type="password"
                    name="password"
                    value={password}
                    handleChange={handleChange}
                    label="password"
                    required 
                />
                <div className="button">
                    <Button type="submit" value="Submit Form">Sign in</Button>
                </div>
                <div className="buttons">
                    <Button type="button" onClick={googleSignInStart} cssClass={'google-sign-in'}><FaGoogle size="27px"/></Button>
                    <Button type="button" onClick={facebookSignInStart} cssClass={'facebook-sign-in'}><FaFacebookF size="27px"/></Button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    facebookSignInStart: () => dispatch(facebookSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn)
