import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';
import * as helper from '../helperFunctions';
import PaginationButtons from './PaginationButtons';
import { setSearchResults, setSelected } from '../actions/inventoryActions';
import { setCart } from '../actions/cartActions';

class DisplayResults extends Component {
    
    componentDidMount(){
        setSearchResults(this.props.inventory.resultsToDisplay || null, 
             this.props.inventory.pageNumber);
    }
    
    handleClick = (event) => {
        let recordDBID = this.props.inventory.resultsToDisplay[event]._id;
        console.log(event);
        let selectedRecord = this.props.inventory.resultsToDisplay[event];
        setSelected(selectedRecord);
        this.props.history.push('/displayOne');
    }
 
    render(){
        let inventoryLoaded = this.props.inventory.haveData? true:false;
        let returnValue = (<div>LOADING</div>)
        if(inventoryLoaded){
            if(this.props.inventory.resultsToDisplay.length === 0){console.log("No Results To Display")}
            
            let saleItems = this.props.inventory.resultsToDisplay.map(item => {
                let storeIndex = this.props.inventory.resultsToDisplay.indexOf(item);
                let transformedResult = helper.getTransformedResult(item,storeIndex);
                return(
                        <button onClick = {this.handleClick.bind(this,storeIndex)} key = {storeIndex}>
                            <SaleItem saleObject = {transformedResult}/>
                        </button>
                        )
            });
            returnValue = (
                <div>
                    {saleItems}
                    <PaginationButtons/>
                </div>);
        }
        return(
            <div>
                {returnValue}
            </div>
            );
     }

}


const mapStateToProps = state => {
    return{
        inventory:state.inventory
    };
};



export default connect(mapStateToProps)(DisplayResults);
