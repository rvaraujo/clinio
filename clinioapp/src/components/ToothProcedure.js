import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form,Row, Col, Button, Alert} from 'react-bootstrap';
import SelecControl from './SelectControl';
import {actionTypes} from "../constants/action-types";
export  class ToothProcedure extends Component{
    constructor(props){
        super(props);

        this.state={
            blockSave:false,
            procedure:'',
            procedureId:''
        };

        this.clearError=this.clearError.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.renderToothControl=this.renderToothControl.bind(this);
        this.onChangeProcedure=this.onChangeProcedure.bind(this);
    }

    handleSave(){
        
        this.setState({procedure:{
            ...this.state.procedure,
            appointmentId:this.props.useAppointment?this.props.currentAppointmentId:null,
            patientId:this.props.currentPatientId, 
            procedureId:this.state.procedureId, 
            toothId:this.props.tooth !== undefined?this.props.tooth.id:null}},function(){
            this.props.saveProcedure(this.state.procedure);
            //console.log(this.state.procedure);
        });
        
    }

    onChangeProcedure(procedure){
        this.setState({procedureId:procedure.procedureId});

    }

    clearError(){
      //  this.setState({showErrorMessage: false, showSuccessMessage:false,blockSave:false, message:''});
      this.props.clearMessages();
    }

    renderToothControl(show){
        if(show)
            return <Form.Group as={Row}>
            <Form.Label column sm={2}>Dente</Form.Label>
            <Col sm={10}>
                <Form.Control type="text" value={`${this.props.tooth.id} - ${this.props.tooth.name}`} readOnly />
            </Col>
        </Form.Group>;
    }

    componentDidMount(){
        if(this.props.procedures.length === 0)
            this.props.loadProcedures();

        
    }

    render(){

        if(this.props.isSuccess){
            setTimeout(() => {
                this.props.closeForm();
          }, 3000);
        }
        
        return (
            <>
                <Alert show={this.props.showError} variant="warning">{this.props.alertMessage}</Alert>
                <Alert show={this.props.isSuccess} variant="success">{this.props.alertMessage}</Alert>
                {this.renderToothControl(this.props.tooth !== undefined)}
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Procedimento</Form.Label>
                    <Col sm={10}>
                        <SelecControl   items={this.props.procedures}
                                        selectedValue={this.state.procedureId}
                                        onChange={(e)=>{this.onChangeProcedure({procedureId:e.target.value})}}
                                                /> 
                    {/* <Form.Control   as="select" 
                                    onChange={(e)=>{
                                        this.clearError();
                                        this.setState({procedure:{...this.state.procedure,procedureId: e.target.value }});
                                    }}
                                    required>
                                <option value={''}>Selecione...</option>
                                <option value="1">Consulta inicial</option>
                                <option value="2">Exame histopatológico</option>
                                <option value="3">Fluorterapia</option>
                                <option value="4">Aplicação de selante</option>
                                <option value="5">Restauração de 2 (duas) faces</option>
                                <option value="6">Ajuste oclusal </option>
                            </Form.Control> */}
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Observações</Form.Label>
                    <Col sm={10}>
                    <Form.Control   as="textarea"
                                    onChange={(e)=>{
                                        this.clearError();
                                        this.setState({procedure:{...this.state.procedure,comments:e.target.value}});
                                        }}/>  
                    </Col>
                </Form.Group>
                <hr/>
                <Button disabled={this.state.blockSave} onClick={this.handleSave}>Salvar</Button>
                <Button className="margin-left-10" variant="secondary" onClick={this.props.closeForm}>Cancelar</Button>
            </>
        );
    }
}

function mapStateToProps(state){
    
    
    return {
        currentAppointmentId: state.currentAppointmentId,
        currentPatientId: state.currentPatientId,
        procedures: state.procedures,
        isSaving: state.isSaving,
        isSuccess: state.isSuccess,
        showError: state.showError,
        alertMessage: state.alertMessage
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
      saveProcedure: (procedure) => dispatch({ type: "SAVE_PROCEDURE",payload:procedure }),
      loadProcedures:()=>dispatch({type:"GET_PROCEDURES"}),
      clearMessages:()=>dispatch({type:actionTypes.CLEAR_MESSAGES})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(ToothProcedure);