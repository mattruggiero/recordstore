
import React, { Component } from 'react';


class SaleItem extends Component {
    render(){
        
        return(<div><img src={this.props.saleObject.coverImage} alt = "NOT FOUND" height="100" width="100"/></div>)
    }
}

export default SaleItem;