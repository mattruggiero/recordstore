import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchResults } from '../actions/inventoryActions';


class PaginationButtons extends Component{
    
    handleClick = (event) => {
        let numberToAdd = event.target.id === 'prev'? -1:1;
        setSearchResults(this.props.searchInput,this.props.pageNumber + numberToAdd);
    }
    
    render(){
        return(
            <div>
                <button 
                    onClick = {this.handleClick} 
                    id = "prev"
                    searchinput = {this.props.searchInput}>
                    PREV
                    </button>
                <button 
                    onClick = {this.handleClick} 
                    id = "next"
                    searchinput = {this.props.searchInput}>
                    NEXT
                    </button>
            </div>
        )
    }
}









const mapStateToProps = state => {
    return{
        searchInput:state.inventory.searchInput,
        pageNumber:state.inventory.pageNumber,
    };
};



export default connect(mapStateToProps)(PaginationButtons);