import React from "react";
import {Form, Col, Card } from 'react-bootstrap';
export default class OdontogramHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            currentTooth:''
        };
    }
    componentDidMount(){
        this.setState({currentTooth: this.props.currentTooth});
    }
    componentWillReceiveProps(nextProps){
        this.setState({currentTooth: nextProps.currentTooth});
    }
    render(){
        return(
            <>
            
                            <Card.Title className="padding-left-10 padding-top-10">{this.state.currentTooth.name} [{this.state.currentTooth.id}]</Card.Title>
                            <Card.Text className="padding-left-10">
                 <Form.Row>
                            <Form.Group as={Col} md="3">
                                <Form.Check 
                                        type="switch"
                                        id="swabsent"
                                        checked={this.state.currentTooth.absent}
                                        label="Ausente"
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                 <Form.Check 
                                    type="switch"
                                    id="swdamaged"
                                    checked={this.state.currentTooth.damaged}
                                    label="Danificado"
                                />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                <Form.Check 
                                    type="switch"
                                    id="c==swrecovered"
                                    checked={this.state.currentTooth.recovered}
                                    label="Restaurado"
                                />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                <Form.Check 
                                    type="switch"
                                    id="swimplanted "
                                    checked={this.state.currentTooth.implanted}
                                    label="Implante"
                                />
                                </Form.Group>
                                </Form.Row>
                                </Card.Text>
                                
            </>
        );
    }
}