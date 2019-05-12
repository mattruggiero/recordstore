import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import * as api from '../middleware/callBackEnd';


class UserLogin extends Component {
    
    handleSubmit = async (event) => {
        event.preventDefault();
        let loginJSON = {
            email: event.target.email.value, 
            password: event.target.password.value
        }
        let loggedIn = await api.login(loginJSON);
        console.log(loggedIn);
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
