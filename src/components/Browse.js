import * as api from '../middleware/callBackEnd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';

class Browse extends Component {
    
    handleClick = (event) => {
        console.log(event);
        console.log(this.props.inventory[event]);
    }
    componentDidMount(){
       api.getInventory();
    }
     render(){
        let inventoryLoaded = this.props.haveData? true:false;
        let returnValue = (<div>LOADING</div>)
        if(inventoryLoaded){
            if(this.props.inventory.length === 0){console.log("STORE IS EMPTY")}
            let saleItems = this.props.inventory.map(item => {
                let saleObject = {
                    genres:item.genres,
                    artist:item.artists[0].name,
                    price:item.price,
                    coverImage:item.images[0].uri,
                    title:item.title,
                    releaseID:item.releaseID
                }
                
                let storeIndex = this.props.inventory.indexOf(item);
                return(
                        <button onClick = {this.handleClick.bind(this,storeIndex)} key = {storeIndex}>
                            <SaleItem 
                                saleObject = {saleObject}
                                key = {saleObject.releaseID}
                                storeindex = {storeIndex} />
                        </button>
                        )
            });
            returnValue = saleItems;

            
            
        }
        
        return(  
                <div>
                    <div>{returnValue}</div>
                </div>
            );
     }

}

const mapStateToProps = state => {
    return{
        inventory:state.inventory,
        haveData:state.haveData,
        pageNumber:state.bookKeeping,
        display:state.display
    };
};



export default connect(mapStateToProps)(Browse);
