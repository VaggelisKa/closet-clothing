import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';

import SigninAndSignUpPage from './pages/signin-and-signup-page/signin-and-signup-page.component';


class App extends React.Component {

  componentDidMount() {
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     const userRef = await createUserProfileDocument(user);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     });
    //   } else {
    //     setCurrentUser(user);
    //   }

    // })
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SigninAndSignUpPage />)} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})


export default connect(mapStateToProps)(App);
