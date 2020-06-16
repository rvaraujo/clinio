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
    static getDerivedStateFromProps(props, state){
       
        if(props.currentTooth.id !== state.currentTooth.id )
            return {currentTooth: props.currentTooth};
        return null;
        
    }

    render(){
        return(
            <>
            
                            <Card.Title className="padding-left-10 padding-top-10">{this.state.currentTooth.name} [{this.state.currentTooth.id}]</Card.Title>
                            <Card.Text as="div" className="padding-left-10">
                 <Form.Row>
                            <Form.Group as={Col} md="3">
                                <Form.Check 
                                        type="switch"
                                        id="swabsent"
                                        checked={this.state.currentTooth.absent||false}
                                        onChange={(e)=>{this.setState({currentTooth:{...this.state.currentTooth,absent:e.target.checked}});}}
                                        label="Ausente"
                                    />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                 <Form.Check 
                                    type="switch"
                                    id="swdamaged"
                                    checked={this.state.currentTooth.damaged||false}
                                    onChange={(e)=>this.setState({currentTooth:{...this.state.currentTooth,damaged:e.target.checked}})}
                                    label="Danificado"
                                />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                <Form.Check 
                                    type="switch"
                                    id="c==swrecovered"
                                    checked={this.state.currentTooth.recovered||false}
                                    onChange={(e)=>this.setState({currentTooth:{...this.state.currentTooth,recovered:e.target.checked}})}
                                    label="Restaurado"
                                />
                                </Form.Group>
                                <Form.Group as={Col} md="3">
                                <Form.Check 
                                    type="switch"
                                    id="swimplanted "
                                    checked={this.state.currentTooth.implanted||false}
                                    onChange={(e)=>this.setState({currentTooth:{...this.state.currentTooth,implanted:e.target.checked}})}
                                    label="Implante"
                                />
                                </Form.Group>
                                </Form.Row>
                                </Card.Text>
                                
            </>
        );
    }
}