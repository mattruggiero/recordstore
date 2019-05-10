import * as api from '../middleware/callBackEnd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';
import * as helper from '../middleware/helperFunctions';
import PaginationButtons from './PaginationButtons';

class DisplayResults extends Component {

    handleClick = (event) => {
        //event === the index of the record in the array in the store
        console.log(event);
        console.log(this.props.resultsToDisplay[event]);
    }
    componentDidMount(){
       api.getResults(this.props.resultsToDisplay || null, this.props.pageNumber);
    }

    render(){
        let inventoryLoaded = this.props.haveData? true:false;
        let returnValue = (<div>LOADING</div>)
        if(inventoryLoaded){
            if(this.props.resultsToDisplay.length === 0){console.log("No Results To Display")}
            
            let saleItems = this.props.resultsToDisplay.map(item => {
                let storeIndex = this.props.resultsToDisplay.indexOf(item);
                let transformedResult = helper.getTransformedResult(item,storeIndex);
                return(
                        <button onClick = {this.handleClick.bind(this,storeIndex)} key = {storeIndex}>
                            <SaleItem saleObject = {transformedResult}/>
                        </button>
                        )
            });
            returnValue = (<div>
                {saleItems}
                <PaginationButtons/>
            </div>);
        }
        return(<div>{returnValue}</div>);
     }

}


const mapStateToProps = state => {
    return{
        resultsToDisplay:state.resultsToDisplay,
        haveData:state.haveData,
        pageNumber:state.pageNumber,
        display:state.display
    };
};



export default connect(mapStateToProps)(DisplayResults);
