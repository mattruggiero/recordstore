import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import DisplayResults from './components/DisplayResults';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import TheNavbar from './components/layout/TheNavbar';


import { Provider } from 'react-redux';
import store from './store';




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

          
        </div>
      </Router>
      </Provider>
      )
  }
}


export default App;
