import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { removeFromCart, emptyCart } from '../actions/cartActions';
import { setSelected } from '../actions/inventoryActions';
import { Spinner } from 'react-bootstrap';


//check token

class Cart extends Component{
    handleRemove = (event) =>{
        let recordDBID = event;
        removeFromCart(recordDBID);
    }
    handleEmpty = (event) => {
        emptyCart();
    }
    handleClick = (event) => {
        console.log(event);
        let selectedRecord = event;
        setSelected(selectedRecord);
        this.props.history.push('/displayOne');
    }

    render(){
        let mySpinner = <Spinner animation = 'grow' variant ='primary' size ='lg' style = {{margin:'10rem'}}/>

        let returnValue = <h1 style = {{textAlign:'center'}}>Nothing in your cart</h1>
        let haveCart = this.props.cart.length ? true:false;
        if(haveCart){
            returnValue = (<div><h1 style = {{textAlign:"center"}}>Nothing in your cart</h1></div>)
            let total = 0;
            let tableBody = this.props.cart.map(item =>{
                total = total + (Number)(item.price);
                return(
                    <tr key = {item.releaseID * Math.random()} >
                        
                        <td>{item.artist}</td>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td><Button block onClick = {this.handleClick.bind(this,item)}>View Details</Button></td>
                        <td><Button block onClick = {this.handleRemove.bind(this,item._id)}>Remove From Cart</Button></td>

                    </tr>
                )
            })
            returnValue = (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Price</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                        <tr>
                            <td></td>
                            <td>TOTAL</td>
                            <td>${total.toFixed(2)}</td>
                            <td><Button block onClick = {this.handleEmpty} >Empty Cart </Button></td>
                        </tr>
                    </tbody>
                </Table>
            )
        }







        return(<Container>{returnValue}</Container>)
    }
}


const mapStateToProps = state => {
    return{
        cart : state.cart.cart,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Cart);