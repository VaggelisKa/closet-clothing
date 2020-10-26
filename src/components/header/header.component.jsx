import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';

import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils';
import  CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, isHidden}) => {
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
                    {currentUser ? (<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>) : (<Link to="/signin" className="option">SIGN IN</Link>)}
                </Link>
                <CartIcon />
                {/* <Link to="/cart" className="option">
                    <CartIcon />
                </Link> */}
            </div>
            {
                isHidden ? null: <CartDropdown />
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);