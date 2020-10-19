import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SigninAndSignUpPage from './pages/signin-and-signup-page/signin-and-signup-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();

    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    this.authSub$ = auth.onAuthStateChanged(async (user) => {
      createUserProfileDocument(user);
    })
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SigninAndSignUpPage} />
        </Switch>
      </div>
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
}

export default App;
