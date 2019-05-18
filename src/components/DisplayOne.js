import React, { Component } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import Gallery from 'react-grid-gallery';

import { formatTracklist } from '../helperFunctions';


class DisplayOne extends Component {
    componentDidMount(){
        if(!this.props.record)
            this.props.history.push('/');
    }
    render(){
        
        let record = this.props.record;
        let tracks = formatTracklist(record.trackList);
        return(
            <div>
                <Container>
                    <Jumbotron fluid>
                    <h1>{record.artist}</h1>
                    <h1>{record.title}</h1>
                    </Jumbotron>
                    <hr/>
                </Container>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col><Image src = {record.images[0].uri} fluid /></Col>
                        <Col></Col>
                    </Row>
                    <Row><Col><hr/></Col></Row>
                    <Row>
                        <Col>
                        <Tabs defaultActiveKey = 'Tracklist'>
                        <Tab eventKey = 'Tracklist' title = 'Tracklist'>
                        <Row>
                            <Col>Title: </Col>
                            <Col></Col>
                            <Col>Duration: </Col>
                        </Row>
                        <hr/>
                        {tracks}
                        </Tab>
                        <Tab eventKey = 'Notes' title = 'Notes'>
                        <Row>
                            <Col>{record.notes}</Col>
                        </Row>
                        </Tab>
                        <Row>

                        </Row>

                        </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        record : state.inventory.selected,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(DisplayOne);