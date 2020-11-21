import React, { useState } from 'react';

import { connect } from 'react-redux'
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState(
        {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    );

    const {
        displayName, 
        email, 
        password, 
        confirmPassword,
    } = userCredentials

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        signUpStart({ email, password, displayName });
    }

    const handleChange = (event) => {
        const {value, name} = event.target;

        setCredentials({...userCredentials, [name]: value});
    }

        
    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Create an account</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required
                />
                <Button type="submit" value="Submit Form">Sign Up</Button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);