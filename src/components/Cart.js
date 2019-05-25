import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import {  emptyCart } from '../actions/cartActions';
import  ViewDetailsButton  from '../components/buttons/ViewDetailsButton';
import RemoveFromCartButton from '../components/buttons/RemoveFromCartButton';
import EmptyCartButton from '../components/buttons/EmptyCartButton';


//check token

class Cart extends Component{
    render(){
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