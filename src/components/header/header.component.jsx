import React from 'react';
import { Link } from 'react-router-dom'

import './header.styles.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils';

const Header = ({currentUser}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link to="/shop" className="option">
                    SHOP
                </Link>
                <Link to="/shop" className="option">
                    CONTACT
                </Link>
                <Link to="/shop" className="option">
                    {currentUser ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> : <Link to="/signin" className="option">SIGN IN</Link>}
                </Link>
            </div>
        </div>
    )
}

export default Header;