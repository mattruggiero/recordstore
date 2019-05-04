
import React, { Component } from 'react';


class SaleItem extends Component {
    render(){
        let record = this.props.saleObject;
        return(
            <div>
                <img 
                    src={record.coverImage} alt = "NOT FOUND" 
                    height="100" width="100"
                />
                <div>ARTIST:  {record.artist}</div>
                <div>ALBLUM:  {record.title}</div>
                <div>PRICE:   {record.price}</div>
            </div>)
    }
}

export default SaleItem;