import React, { Component } from 'react';

import DisplayResults from './components/DisplayResults';

import SearchForm from './components/SearchForm';

import UserRegister from './components/UserRegister';

//<SearchForm/>
//<DisplayResults/>

class App extends Component{
  render(){
    return(
      <div>
       <UserRegister/>
      </div>
      )
  }
}


export default App;
