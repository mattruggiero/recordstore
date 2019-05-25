import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foundInCart, getTransformedResult } from '../helperFunctions';
import PaginationButtons from './PaginationButtons';
import { setSearchResults, setSelected } from '../actions/inventoryActions';
import {  addToCart, removeFromCart } from '../actions/cartActions';
import { Row, Col, Container, Card, Button, Spinner} from 'react-bootstrap';
import ViewDetailsButton from './buttons/ViewDetailsButton';

//pagination buttons should only show up if needed
//needs a message for bad searchInput
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
     }
    handleRemoveFromCart = (event) =>{
        let recordDBID = event;
        removeFromCart(recordDBID);
    }
    handleClick = (event) => {
        let selectedRecord = this.props.inventory.resultsToDisplay[event];
        setSelected(selectedRecord);
        this.props.history.push('/displayOne');
    }
    render(){
        let mySpinner = <Spinner animation = 'grow' variant ='primary' size ='lg' style = {{margin:'10rem'}}/>
        let loggedIn = this.props.auth;
        let inventoryLoaded = this.props.inventory.haveData? true:false;
        let returnValue = <Container style = {{textAlign:'center'}}>
            {mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}{mySpinner}
            </Container>;
        if(inventoryLoaded){
            let saleItems = this.props.inventory.resultsToDisplay.map(item => {
                let storeIndex = this.props.inventory.resultsToDisplay.indexOf(item)
                let transformedResult = getTransformedResult(item,storeIndex);
                let alreadyInCart = foundInCart(this.props.cart,item._id);
                let addToCartButton = (
                <Button 
                    onClick = {this.handleAddToCart.bind(this,item._id)}
                    size = 'sm' block>
                    Add To Cart
                </Button>
                );
                let removeFromCartButton = (
                    <Button
                        onClick = {this.handleRemoveFromCart.bind(this,item._id)}
                        size = 'sm' block>
                        Remove From Cart
                    </Button>
                )
                let cartButton = alreadyInCart? removeFromCartButton:addToCartButton;
                return(
                    <Col key = {item._id}>
                    <Card style = {{width: '16rem',height:'35rem',margin:'1rem'}} border = "dark" >
                    <Card.Img 
                        variant="top" 
                        src={transformedResult.coverImage}
                        height="250" />
                    <Card.Body >
                        <Card.Title>{transformedResult.artist}</Card.Title>
                        <Card.Text style = {{height:"7rem"}}>{transformedResult.title}</Card.Text>
                        <Row>
                        <Col>
                        <ViewDetailsButton storeIndex = {storeIndex}/>
                        {loggedIn? cartButton : <div></div>}
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
        inventory:state.inventory,
        auth:state.auth.isAuthenticated,
        cart:state.cart.cart
    };
};



export default connect(mapStateToProps)(DisplayResults);
