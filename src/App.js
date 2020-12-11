import React, { lazy, useEffect, Suspense } from 'react';

import { GlobalStyle } from './global.styles';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import Header from './components/header/header.component.jsx';
import Spinner from './components/spinner/spinner.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SigninAndSignUpPage = lazy(() => import('./pages/signin-and-signup-page/signin-and-signup-page.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => currentUser ? (<Redirect to='/' />) : (<SigninAndSignUpPage />)} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Suspense>
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
