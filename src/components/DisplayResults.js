import React, { Component } from 'react';
import { connect } from 'react-redux';
import SaleItem from './SaleItem';
import * as helper from '../helperFunctions';
import PaginationButtons from './PaginationButtons';
import { setSearchResults, setSelected } from '../actions/inventoryActions';
import { setCart, addToCart } from '../actions/cartActions';
import { Row, Col, Container, Card, Button, CardColumns } from 'react-bootstrap';

//needs to be optimised so pagination buttons only show up if there is more results
//needs a message for bad searchInput
//need to force all cards to same size 
//cart needs work, need a message if item is already in cart, also would be nice to remove
//      from cart here
// server lets add multiples to cart need a plan for this


class DisplayResults extends Component {
    componentDidMount(){
        setSearchResults(this.props.inventory.resultsToDisplay || null, 
             this.props.inventory.pageNumber);
    }
    handleAddToCart = (event) =>{
        let recordDBID = event;
        addToCart(recordDBID);
        console.log("ADDED TO CART");
        
    }
    handleClick = (event) => {
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
                //needs to be refactored this function is not needed!!!!!!!
                let transformedResult = helper.getTransformedResult(item,storeIndex);
                return(
                    <Col key = {item._id}>
                    <Card style = {{width: '21rem'}} border = "dark" >
                    <Card.Img 
                        variant="top" 
                        src={transformedResult.coverImage}
                        height="250" />
                    <Card.Body>
                        <Card.Title>{transformedResult.artist}</Card.Title>
                        <Card.Text>{transformedResult.title}</Card.Text>
                        <Row>
                        <Col>
                        <Button 
                            size = 'sm' 
                            block
                            onClick = {this.handleClick.bind(this,storeIndex)}>
                            View Details
                        </Button>
                        </Col><Col>
                        <Button 
                            onClick = {this.handleAddToCart.bind(this,item._id)}
                            size = 'sm'
                            block>
                            Add To Cart
                        </Button>
                        </Col>
                        </Row>
                        <Card.Footer>Price: ${transformedResult.price}</Card.Footer>
                    </Card.Body>
                    </Card>
                    </Col>
                )
            });
            returnValue = (
                <div>
                    <Container>
                    <Row>
                    {saleItems}
                    </Row>
                    <PaginationButtons/>
                    </Container>
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
