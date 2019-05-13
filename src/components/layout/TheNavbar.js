import React, { Component } from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchForm from '../SearchForm';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';


class TheNavbar extends Component {
    render(){

        let loggedIn = this.props.auth;
        
        let displayCart = (
            <Nav className = 'mr-auto'>
            <LinkContainer  to = '/cart'>
            <NavItem>Cart</NavItem>
            </LinkContainer>
            </Nav>
        );
        let notLoggedIn = (
            <Nav className = 'mr-auto'>
            <LinkContainer  to = '/login'>
                <NavItem>Login/</NavItem>
            </LinkContainer>
           
            <LinkContainer to = '/register'>
                <NavItem>Register</NavItem>
            </LinkContainer>
            </Nav>

        );

        let navsToDisplay = loggedIn? displayCart:notLoggedIn;
        return(
            
            <Navbar bg='primary'  >
            <Nav className = 'mr-auto'>
            <LinkContainer to = '/'>
                <NavItem>Home</NavItem>
            </LinkContainer>
            </Nav>
            
            {navsToDisplay}

            <Nav className = 'mr-auto'>
            <SearchForm/>
            </Nav>
            
            
           
            </Navbar>
           
            
        )
        
    }
}

const mapStateToProps = state => ({
    auth: state.isAuthenticated,
})


export default connect(mapStateToProps)(TheNavbar);