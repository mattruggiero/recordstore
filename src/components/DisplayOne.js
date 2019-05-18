import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
//import Gallery from 'react-grid-gallery';

import { formatTracklist } from '../helperFunctions';


class DisplayOne extends Component {
    componentDidMount(){
        if(!this.props.record)
            this.props.history.push('/');
    }
    render(){
        return("HELLO");
    }
}

const mapStateToProps = state => {
    return{
        record : state.inventory.selected,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(DisplayOne);