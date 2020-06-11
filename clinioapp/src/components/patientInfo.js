import React from "react";
import {Form, Col, Button} from 'react-bootstrap';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CepService from '../services/cepService.js';
import Moment from 'moment';



import "../assets/css/patientInfo.css";

// function mapStateToProps(state) {
//     return { currentPatient: state.currentPatient }
//   }


  export default  class PatientInfo extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            validated:false,
            currentPatient:''
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
    this.setState({currentPatient: this.props.currentPatient});
}
   

    componentWillReceiveProps(nextProps){
      
       this.setState({currentPatient: nextProps.currentPatient},function(){
      
       });
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
                        onChange={()=>{}}
                       value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.name:''}
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
                                                    onChange={(e)=>{
                                                        console.log(e.isValid());
                                                    }} 
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
                                value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.email:''}
                                placeholder="E-mail do Paciente"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Control   as="select" 
                                            required
                                            value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.gender:''}>
                                <option value={''}>Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Informe o Gênero do Paciente</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Convênio</Form.Label>
                            <Form.Control   as="select" 
                                            required
                                            value={this.state.currentPatient !== undefined || this.state.currentPatient !== undefined?this.state.currentPatient.insurance:''}>
                                <option value={''}>Selecione...</option>
                                <option value="1">Particular</option>
                                <option value="2">Odontosystem</option>
                                <option value="3">Uniodonto</option>
                                <option value="4">Amil Dental</option>
                                <option value="5">Hapvida</option>
                                <option value="6">Odontoart</option>
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
                                value={this.state.currentPatient!==undefined?this.state.currentPatient.postalCode:''}
                                onChange={(e)=>this.addressSearch(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly
                                value={this.state.currentPatient!==undefined?this.state.currentPatient.city:''}
                                placeholder="Cidade"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                required
                                readOnly
                                value={this.state.currentPatient!==undefined?this.state.currentPatient.state:''}
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
                                    value={this.state.currentPatient!==undefined?this.state.currentPatient.address:''}
                                    placeholder="Endereço / Logradouro"
                                />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.currentPatient!==undefined?this.state.currentPatient.addressNumber:''}
                                    placeholder="Número"
                                />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.currentPatient!==undefined?this.state.currentPatient.addressComplement:''}
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
// export default connect(mapStateToProps)(PatientInfo);