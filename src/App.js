import React, { Component } from 'react';

import DisplayResults from './components/DisplayResults';

import SearchForm from './components/SearchForm';

import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';



/* <SearchForm/>
<DisplayResults/> */
//<UserRegister/>
class App extends Component{
  render(){
    return(
      <div>
       <UserLogin/>
      </div>
      )
  }
}


export default App;
