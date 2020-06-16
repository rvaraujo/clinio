import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Accordion,Card, Button,Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {odontogramProcedures} from '../constants/odontogramProcedures' ;
import ToothProcedure from './ToothProcedure';
import {actionTypes} from "../constants/action-types";
export class PreExistingProcedures extends Component{
    constructor(props){
        super(props);

        this.state={
            showAddForm:false
        };
        this.addProcedure=this.addProcedure.bind(this);
        this.closeAddProcedure=this.closeAddProcedure.bind(this);
    }

    addProcedure(){
        this.setState({showAddForm:true});
    }

    closeAddProcedure(){
        this.setState({showAddForm:false});
        this.props.clearMessages();
    }

    render(){
        return(
            <>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">Procedimentos Pré-Existentes</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div className="add-button-area">
                                <Button className="add-button" 
                                        onClick={this.addProcedure}
                                        >
                                            <i className="fas fa-plus"></i></Button>
                            </div>
                        <DataTable  
                            noDataComponent="Nenhum procedimento registrado"
                            className="procedures-table"
                            noHeader={true}
                            noTableHead={true}
                            columns={odontogramProcedures.preExistingProcedures}
                            data={this.props.procedures}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Modal  show={this.state.showAddForm}
                        backdrop="static"
                        onHide={() => this.setState({showAddForm:false})}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                    <Modal.Header className="procedure-area">
                        <Modal.Title  id="contained-modal-title-vcenter">
                            Cadastrar Procedimento
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ToothProcedure tooth={this.props.currentTooth}
                                        useAppointment={false}
                                        closeForm={this.closeAddProcedure} />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
function mapStateToProps(state){
    
    return {
        procedures: state.toothPreExistingProcedures,
        currentTooth: state.currentTooth
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
      clearMessages:()=>dispatch({type:actionTypes.CLEAR_MESSAGES})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(PreExistingProcedures);