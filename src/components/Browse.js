import * as api from '../middleware/callBackEnd';
import React, { Component } from 'react';

class Browse extends Component {
    state = null

    componentDidMount(){
        api.browseAll()
            .then(response => {
                this.setState({data:response})
            })
            .catch(error=>{
                console.log(error);
            })
    }
     render(){
        let hasData = this.state? true:false;
        console.log(hasData);
        let returnValue = hasData? this.state.data[0].title:"WORLD";
        console.log(returnValue);
       return(<div>{returnValue}</div>)
     }

}

export default Browse;
