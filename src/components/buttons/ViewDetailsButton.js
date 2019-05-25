import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setSelected } from '../../actions/inventoryActions';



class ViewDetailsButton extends Component {

    handleClick = (event) =>{
        let selectedRecord = this.props.inventory.resultsToDisplay[event];
        setSelected(selectedRecord);
        this.props.history.push('/displayOne');
    }

    render(){
        //old button 
    //     <Button 
    //     size = 'sm' 
    //     block
    //     onClick = {this.handleClick.bind(this,storeIndex)}>
    //     View Details
    // </Button>
        let storeIndex = this.props.storeIndex;
        console.log("button store index: ",storeIndex);
        return(
            <Button
                size = 'sm' block 
                onClick = {this.handleClick.bind(this,storeIndex)}>
                View Details
            </Button>
        );
    }
}


const mapStateToProps = state => {
    return{
        inventory:state.inventory
    }
}

export default connect(mapStateToProps)(ViewDetailsButton);


