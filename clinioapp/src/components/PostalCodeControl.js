import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import CepService from '../services/CepService';
export  default class PostalCodeControl extends Component{
    constructor(props){
        super(props);

        this.findAddress=this.findAddress.bind(this);
    }
    findAddress(event){
        if(event.target.value.length === 8)
        this.props.onChange(CepService.GetAddressByPostalCode(event.target.value));
    }
    render(){
        return (
            <>
            <Form.Control
                                type="text"
                                placeholder="CEP"
                                defaultValue={this.props.postalCode||''}
                                onChange={this.findAddress}
                            />
            </>
        );
    }
}