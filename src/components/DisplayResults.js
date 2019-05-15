import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';
import * as helper from '../helperFunctions';
import PaginationButtons from './PaginationButtons';
import { setSearchResults } from '../actions/inventoryActions';

class DisplayResults extends Component {

    handleClick = (event) => {
        console.log(event);
        console.log(this.props.inventory.resultsToDisplay[event]);
    }
    componentDidMount(){
       setSearchResults(this.props.inventory.resultsToDisplay || null, 
            this.props.inventory.pageNumber);
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
