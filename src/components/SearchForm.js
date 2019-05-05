import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import * as api from '../middleware/callBackEnd';



class SearchForm extends Component {
    constructor(props){
            super(props);
            this.state = {
                searchInput: null, 
            }
            this.handleTyping = this.handleTyping.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidUpdate = (prevProps, prevState) => {
            let noInput = (
                this.state.searchInput === null ||
                this.state.searchInput === 0
            );
            if(noInput){
                //call backe end browseAll Route
                console.log("no input");
            }
        }

        handleTyping = (event) => { 
            event.preventDefault();
            this.setState({
                searchInput:""+event.target.value,
            })
        }

        handleSubmit = (event) => {
            event.preventDefault();
            api.search(this.state.searchInput);
            
        }

        render(){
            return(
            <Container>
                <Form onSubmit = {this.handleSubmit}>
                <Form.Control
                    required = {true}
                    onChange = {this.handleTyping}
                    type = "text"
                    name = "searchInput"
                    placeholder = 'What are you looking for?'/>
                <Button
                    variant = "primary"
                    type = 'submit'>
                    SEARCH
                </Button>
                </Form>
            </Container>)
        }
    }


export default SearchForm;