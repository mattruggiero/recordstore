import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as call from '../middleware/callBackEnd';


class PaginationButtons extends Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => {
        //refactor once search input is added to store
        let numberToAdd = event.target.id === 'prev'? -1:1;
        call.getResults(event.target.searchInput,this.props.pageNumber + numberToAdd);
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
        haveData:state.haveData,
        pageNumber:state.pageNumber,
    };
};



export default connect(mapStateToProps)(PaginationButtons);