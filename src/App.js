import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


import DisplayResults from './components/DisplayResults';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import TheNavbar from './components/layout/TheNavbar';
import DisplayOne from './components/DisplayOne';
import Footer from './components/layout/Footer';
import Cart from './components/Cart';


import { Provider } from 'react-redux';
import { SET_CURRENT_USER } from './actions/types';
import store from './store';
import { setAuthToken } from './helperFunctions';
import { logoutUser } from './actions/authActions';
import { setCart } from './actions/cartActions';

//check for token
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //check for expired token 
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  store.dispatch({
    type:SET_CURRENT_USER,
    payload: decoded
  });
  setCart();
}


class App extends Component{
  render(){
    return(
      <Provider store = {store}>
      <Router>
        <div>
          <TheNavbar/>
          <hr/>
          <Route exact path = "/login" component = { UserLogin }/>
          <Route exact path = "/register" component = { UserRegister }/>
          <Route exact path = "/" component = { DisplayResults }/>
          <Route exact path = "/displayOne" component = { DisplayOne }/>
          <Route exact path = "/cart" component = { Cart }/>
          <hr/>
          <Footer/>

          
        </div>
      </Router>
      </Provider>
      )
  }
}


export default App;
