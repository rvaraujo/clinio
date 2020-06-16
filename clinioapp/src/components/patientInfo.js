import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Col, Button, Alert} from 'react-bootstrap';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import SelecControl from './SelectControl';
import PostalCodeControl from './PostalCodeControl';
import InputMask from 'react-input-mask';
import {actionTypes} from "../constants/action-types";

export class PatientInfo extends Component{
    constructor(props){
        super(props);
        
        this.state={
            validated:false
        };

        this.onChangePatientInfo=this.onChangePatientInfo.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }

    handleSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        this.setState({validated:!form.checkValidity()});

        if(form.checkValidity()){
            this.props.editPatient(this.props.currentPatientRecord.patient);
        }
    }

   

    onChangePatientInfo(userInfo){
        this.props.clearMessages();
        this.props.editPatientInfo(userInfo);
    }

    componentDidMount(){
        if(this.props.genders.length === 0)
            this.props.loadGenders();

        if(this.props.insurances.length === 0)
            this.props.loadInsurances();
    }

    render(){
        console.log(this.props);
        return (
            <>
                <Alert variant="warning" show={this.props.showError}>{this.props.alertMessage}</Alert>
                <Alert variant="success" show={this.props.isSuccess}>{this.props.alertMessage}</Alert>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Label>Nome Paciente</Form.Label>
                        <Form.Control   as="input"
                                        required
                                        type="text"
                                        onChange={(e)=>{this.onChangePatientInfo({name:e.target.value})}}
                                        value={this.props.currentPatientRecord.patient.name ||''}
                                        placeholder="Nome do Paciente"/>
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
                                                    onChange={(e)=>{this.onChangePatientInfo({birthDate:e.format("DD/MM/yyyy")})}}
                                                    format="DD/MM/yyyy"
                                                    inputValue={this.props.currentPatientRecord!==''?moment(this.props.currentPatientRecord.patient.birthDate).format('DD/MM/yyyy'):null} 
                                                    value={null}/>
                                </MuiPickersUtilsProvider>
                            <Form.Control.Feedback type="invalid">Informe o Data de Nascimento do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>CPF</Form.Label>
                            <InputMask  className="form-control"
                                        value={this.props.currentPatientRecord.patient.documentId || ''}
                                        onChange={(e)=>{
                                            let _documentId = e.target.value.replaceAll('.','').replace('-','');
                                            this.onChangePatientInfo({documentId:_documentId});
                                        }}
                                        mask="999.999.999-99" 
                                        maskChar=" " />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control   type="text"
                                            value={this.props.currentPatientRecord.patient.email || ''}
                                            onChange={(e)=>{this.onChangePatientInfo({email:e.target.value})}}
                                            placeholder="E-mail do Paciente"/>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Sexo</Form.Label>
                            <SelecControl   items={this.props.genders}
                                            onChange={(e)=>{this.onChangePatientInfo({genderId:e.target.value})}}
                                            selectedValue={this.props.currentPatientRecord.patient.genderId}/>
                            <Form.Control.Feedback type="invalid">Informe o Gênero do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Convênio</Form.Label>
                            <SelecControl   items={this.props.insurances}
                                            onChange={(e)=>{this.onChangePatientInfo({insuranceId:e.target.value})}}
                                            selectedValue={this.props.currentPatientRecord.patient.insuranceId}/>
                            <Form.Control.Feedback type="invalid">Informe o Tipo de Convênio do Paciente</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>CEP</Form.Label>
                            <PostalCodeControl  onChange={(addressByPostalCode)=>{
                                                                var self = this;
                                                                addressByPostalCode.then(function(res){
                                                                    self.onChangePatientInfo({  postalCode: res.postalCode,
                                                                                                address: res.address, 
                                                                                                city: res.city, 
                                                                                                state: res.state, 
                                                                                                neighborhood: res.neighborhood});
                                                                });
                                                }} 
                                                postalCode={this.props.currentPatientRecord.patient.postalCode}/>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control   type="text"
                                            readOnly
                                            onChange={(e)=>{this.onChangePatientInfo({city:e.target.value})}}
                                            value={this.props.currentPatientRecord.patient.city||''}
                                            placeholder="Cidade"/>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control   required
                                            readOnly
                                            onChange={(e)=>{this.onChangePatientInfo({state:e.target.value})}}
                                            value={this.props.currentPatientRecord.patient.state||''}
                                            type="text"
                                            placeholder="Estado"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control   type="text"
                                            value={this.props.currentPatientRecord.patient.address||''}
                                            onChange={(e)=>{this.onChangePatientInfo({address:e.target.value})}}
                                            placeholder="Endereço / Logradouro"/>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Número</Form.Label>
                            <Form.Control   type="text"
                                            value={this.props.currentPatientRecord.patient.addressNumber||''}
                                            onChange={(e)=>{this.onChangePatientInfo({addressNumber:e.target.value})}}
                                            placeholder="Número"/>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control   type="text"
                                            value={this.props.currentPatientRecord.patient.neighborhood||''}
                                            onChange={(e)=>{this.onChangePatientInfo({neighborhood:e.target.value})}}
                                            placeholder="Bairro"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control   type="text"
                                        value={this.props.currentPatientRecord.patient.complement||''}
                                        onChange={(e)=>{this.onChangePatientInfo({complement:e.target.value})}}
                                        placeholder="Complemento"/>
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

const mapDispatchToProps = dispatch => {
    return {
      editPatientInfo: (data) => dispatch({ type: actionTypes.PATIENT_INFO_CHANGED, payload:data }),
      clearMessages: (data) => dispatch({ type: actionTypes.CLEAR_MESSAGES}),
      loadGenders:()=>dispatch({type:"GET_GENDERS"}),
      loadInsurances:()=>dispatch({type:"GET_INSURANCES"}),
      editPatient:(patient)=>dispatch({type:"EDIT_PATIENT", payload:patient})
    }
  }

function mapStateToProps(state){
    
    return {
        currentPatientRecord: state.currentPatientRecord,
        genders: state.genders,
        insurances: state.insurances,
        isSuccess: state.isSuccess,
        showError: state.showError,
        alertMessage: state.alertMessage
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientInfo);