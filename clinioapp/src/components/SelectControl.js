import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
export default class SelectControl extends Component{
    
    constructor(props){
        super(props);

        this.onChange=this.onChange.bind(this);
    }

    onChange(e){
        this.props.onChange(e);
    }

    render(){
        return (
            <>
                <Form.Control   as="select" 
                            required
                            onChange={this.onChange}
                            value={this.props.selectedValue||''}>    
                            <option value="">Selecione...</option>
                            {this.props.items.map(el=>(
                                <option key={el.key} value={el.key}>{el.value}</option>
                            ))}
            </Form.Control>
            </>
        );
    }
}