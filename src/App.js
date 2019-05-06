import React, { Component } from 'react';

import DisplayResults from './components/DisplayResults';

import SearchForm from './components/SearchForm';

class App extends Component{
  render(){
    return(
      <div>
        <SearchForm/>
        <DisplayResults/>
      </div>
      )
  }
}


export default App;
