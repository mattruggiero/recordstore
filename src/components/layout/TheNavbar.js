import React, { Component } from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import SearchForm from '../SearchForm';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

//window.location.href = '/login';
class TheNavbar extends Component {
    onClick = (event) => {
        logoutUser();
        window.location.href = '/login';
    }
    render(){

        let haveToken = this.props.auth.isAuthenticated;
       
        
        
        let loggedIn = (
            <Nav className = 'mr-auto'>
            <LinkContainer  to = '/cart'>
            <NavItem>Cart</NavItem>
            </LinkContainer>
            <NavItem>
                <button onClick = {this.onClick}>
                    Logout
                </button>
            </NavItem>
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

        let navsToDisplay = haveToken? loggedIn:notLoggedIn;
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
    auth: state.auth,
})


export default connect(mapStateToProps)(TheNavbar);