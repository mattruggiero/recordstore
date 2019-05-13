import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import DisplayResults from './components/DisplayResults';

import SearchForm from './components/SearchForm';

import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import TheNavbar from './components/layout/TheNavbar';



/* <SearchForm/>
<DisplayResults/> */
//<UserRegister/>
class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <TheNavbar/>
          <hr/>
          <Route exact path = "/login" component = { UserLogin }/>
          <Route exact path = "/register" component = { UserRegister }/>
          <Route exact path = "/" component = { DisplayResults }/>

          
        </div>
      </Router>
      )
  }
}


export default App;
