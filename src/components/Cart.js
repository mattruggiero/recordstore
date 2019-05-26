import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import  ViewDetailsButton  from '../components/buttons/ViewDetailsButton';
import RemoveFromCartButton from '../components/buttons/RemoveFromCartButton';
import EmptyCartButton from '../components/buttons/EmptyCartButton';
import PaypalButton from './paypal/PaypalButton';
import { CLIENT } from './paypal/keys';
import axios from 'axios';
import { emptyCart } from '../actions/cartActions';

function removePurchasedItemsFromInventory(cart){
    axios({method:'post',url:'/removeRecords',data:cart})
        .then(response =>{console.log("axios call made")})
}

const ENV = process.env.NODE_ENV === 'production'? 'production':'sandbox';


//check token

class Cart extends Component{
    render(){

        const onSuccess = (payment) => {
            console.log('Successful payment!!',payment);
            removePurchasedItemsFromInventory(this.props.cart);
            emptyCart();
            //display success component
            //push back to browse
        }
        const onError = (error) => console.log('Erroneous payment or failed to load script!!',error);
        // show error message
        // stay put 
        const onCancel = (data) => console.log('Cancelled payment!',data);
        //show error message
        //stay put


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
                        <td><ViewDetailsButton history = {this.props.history} record = {item}/></td>
                        <td><RemoveFromCartButton recordDBID = {item._id}/></td>
                    </tr>
                )
            })
            let checkout = (
                <div>
                <PaypalButton
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={'USD'}
                    total={total.toFixed(2)}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                    />
            </div>

            )
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
                            <td><EmptyCartButton/></td>
                            <td>{checkout}</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    return(
        <Container>
            {returnValue}
         
        </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        cart : state.cart.cart,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Cart);