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
        console.log("numberToAdd: ",numberToAdd);
        console.log("this.props.pageNumber: ",this.props.pageNumber);
        call.getResults(this.props.searchInput,this.props.pageNumber + numberToAdd);
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
        searchInput:state.searchInput,
        pageNumber:state.pageNumber,
    };
};



export default connect(mapStateToProps)(PaginationButtons);