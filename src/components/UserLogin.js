import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import * as api from '../middleware/callBackEnd';
import { connect } from 'react-redux';


class UserLogin extends Component {
    componentDidMount(){
        if(this.props.auth){
            this.context.history.push('/register');
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.auth){
            this.context.history.push('/register');
        }
    }
    
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




const mapStateToProps = state => ({
    auth: state.isAuthenticated,
    user:state.user
})


export default connect(mapStateToProps)(UserLogin);
