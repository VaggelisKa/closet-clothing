import React, { useEffect } from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';

import SigninAndSignUpPage from './pages/signin-and-signup-page/signin-and-signup-page.component';


const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to='/' />) : (<SigninAndSignUpPage />)} />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
