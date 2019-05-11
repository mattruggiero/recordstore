import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import * as api from '../middleware/callBackEnd';


class UserLogin extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("LOGIN HANDLE SUBMIT");
        let loginJSON = {
            email: event.target.email.value, 
            password: event.target.password.value
        }
        console.log(loginJSON);
    }
    render(){
        return(
            <Container>
            <Form onSubmit = {this.handleSubmit}>
            <Form.Control id = "email" placeholder = "Email Address"/>
            <Form.Control id = "password" placeholder = "Password"/>
            
            <Button variant = "primary" type = 'submit'>
                SUBMIT
            </Button>
            </Form>
        </Container>
        );
        
    }

}


export default UserLogin;
