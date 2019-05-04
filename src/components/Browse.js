import * as api from '../middleware/callBackEnd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';

class Browse extends Component {
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
                    mediaCondition:item.mediaCondition,
                    coverCondition:item.coverCondition,
                    coverImage:item.images[0].uri,
                    title:item.title,
                    releaseID:item.releaseID
                }
                return(<SaleItem saleObject = {saleObject} key = {saleObject.releaseID}/>)
            });
            returnValue = saleItems;
            // console.log(this.props.inventory);
            
            // let current = this.props.inventory[0];
            // let coverImage = current.images[0].uri;
            // let saleObject = {
            //     genres:current.genres,
            //     artist:current.artists[0].name,
            //     price:current.price, 
            //     mediaCondition:current.mediaCondition,
            //     coverCondition:current.coverCondition,
            //     coverImage:current.images[0].uri,
            //     title:current.title,
            //     releaseID:current.releaseID,

            // }

            // console.log(this.props.pageNumber)
          

            // returnValue = (
            //     <div>
            //         <SaleItem saleObject = {saleObject}/>
            //         <img src={coverImage} alt = "NOT FOUND" height="200" width="200"/>
            //     </div>
            // )
            
            
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
    };
};



export default connect(mapStateToProps)(Browse);
