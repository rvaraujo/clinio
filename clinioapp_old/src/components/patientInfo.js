import React from "react";
import {Form, Col, Button} from 'react-bootstrap';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CepService from '../services/cepService.js';
import Moment from 'moment';
import ParametersService from '../services/parametersService.js';


import "../assets/css/patientInfo.css";

  export default  class PatientInfo extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            validated:false,
            currentPatient:'',
            genders:[],
            insurances:[]
        };

        

        this.handleSubmit=this.handleSubmit.bind(this);
        this.addressSearch=this.addressSearch.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        this.setState({validated:!form.checkValidity()});
    }

    addressSearch(postalCode){
        var self = this;
        if(postalCode.length === 8){
            CepService.GetAddressByPostalCode(postalCode).then(function(result){
                if (result !== null){
                    self.setState({currentPatient: {...self.state.currentPatient,address:result.address ,city: result.city, state: result.state}});
                }
            });
        }
       
    }

    
componentDidMount(){
    var self = this;
    ParametersService.getGenders().then(function(res){
        let genderOptions= res.map((item)=>{
            return <option key={item.key} value={item.key}>{item.value}</option>;
        });
        genderOptions.splice(0,0,<option key={0} value={''}>Selecione...</option>);
        
        self.setState({genders:genderOptions});
    });

    ParametersService.getInsurances().then(function(res){
        let insuranceOptions= res.map((item)=>{
            return <option  key={item.key} value={item.key}>{item.value}</option>;
        });
        insuranceOptions.splice(0,0,<option key={0} value={''}>Selecione...</option>);
        
        self.setState({insurances:insuranceOptions});
    });

    self.setState({currentPatient: this.props.currentPatient});
}
    render(){
     
        return (
            <>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                    <Form.Label>Nome Paciente</Form.Label>
                    <Form.Control as="input"
                        required
                        type="text"
                        onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, name:e.target.value}});}}
                       value={this.state.currentPatient.name ||''}
                        placeholder="Nome do Paciente"
                    />
                    <Form.Control.Feedback type="invalid">Informe o Nome do Paciente</Form.Control.Feedback>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker className="form-control" 
                                                    disableToolbar   
                                                    InputAdornmentProps={{ disablePointerEvents:true }} 
                                                    variant="inline" 
                                                    inputVariant="outlined" 
                                                    onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, birthDate:e.format("DD/MM/yyyy")}});}}
                                                    format="DD/MM/yyyy"
                                                    inputValue={this.state.currentPatient!==undefined?Moment(this.state.currentPatient.birthDate).format('DD/MM/yyyy'):null} 
                                                    value={null}
                                                    />
                            </MuiPickersUtilsProvider>
                        
                        <Form.Control.Feedback type="invalid">Informe o Data de Nascimento do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.currentPatient.email || ''}
                                onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, email:e.target.value}});}}
                                placeholder="E-mail do Paciente"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Control   as="select" 
                                            required
                                            onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, genderId:e.target.value}});}}
                                            value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.genderId:''}>
                                {this.state.genders}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Informe o Gênero do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Convênio</Form.Label>
                            <Form.Control   as="select" 
                                            required
                                            onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, insuranceId:e.target.value}});}}
                                            value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.insuranceId:''}>
                                {this.state.insurances}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Informe o Tipo de Convênio do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                value={this.state.currentPatient.postalCode||''}
                                onChange={(e)=>{
                                    this.setState({currentPatient:{...this.state.currentPatient, postalCode:e.target.value}});
                                    this.addressSearch(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, city:e.target.value}});}}
                                value={this.state.currentPatient.city||''}
                                placeholder="Cidade"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                required
                                readOnly
                                onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, state:e.target.value}});}}
                                value={this.state.currentPatient.state||''}
                                type="text"
                                placeholder="Estado"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="8">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.currentPatient.address||''}
                                    onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, address:e.target.value}});}}
                                    placeholder="Endereço / Logradouro"
                                />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.currentPatient.addressNumber||''}
                                    onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, addressNumber:e.target.value}});}}
                                    placeholder="Número"
                                />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.currentPatient.complement||''}
                                        onChange={(e)=>{this.setState({currentPatient:{...this.state.currentPatient, complement:e.target.value}});}}
                                        placeholder="Complemento"
                                    />
                    </Form.Row>
                    <hr/>
                    <Form.Row className="submitbutton-area">
                        <Button type="submit">Salvar</Button>
                    </Form.Row>
                </Form>
            </>
        );
    }
}