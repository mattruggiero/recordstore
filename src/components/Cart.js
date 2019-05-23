import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { removeFromCart } from '../actions/cartActions';


//check token

class Cart extends Component{
    handleRemove = (event) =>{
        let recordDBID = event;
        removeFromCart(recordDBID);
    }
    
    render(){
        let returnValue = (<div></div>)
        let haveCart = this.props.cart.length ? true:false;
        if(haveCart){
            let total = 0;
            let tableBody = this.props.cart.map(item =>{
                total = total + (Number)(item.price);
                return(
                    <tr key = {item.releaseID * Math.random()}>
                        <td>1</td>
                        <td>{item.artist}</td>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td><Button onClick = {this.handleRemove.bind(this,item._id)}>Remove From Cart</Button></td>

                    </tr>
                )
            })
            returnValue = (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>TOTAL</td>
                            <td>${total.toFixed(2)}</td>
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