import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Col, Card } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import SyncLoader from 'react-spinners/SyncLoader'
import {actionTypes} from "../constants/action-types";
export  class OdontogramHeader extends Component{
    render(){
        return (
            <>
           
                <Card>
                        <Card.Header>Odontograma</Card.Header>
                           {this.props.currentTooth !== '' &&
                            <LoadingOverlay
                                active={this.props.isSaving}
                                spinner={<SyncLoader />}
                                text='Salvando...'
                                >
                                     <div className="toothIdentification">
                                     {this.props.currentTooth !== undefined &&
                                     <>
                                    <Card.Title className="text-align-center">
                                        
                                        <div>{this.props.currentTooth.name} [{this.props.currentTooth.id}]</div>
                                        
                                        </Card.Title>
                            <Card.Text as="div" className="padding-left-10"> 
                                <Form.Row>
                                    <Form.Group as={Col} md="3">
                                        <Form.Check 
                                                type="switch"
                                                id="swabsent"
                                                checked={this.props.currentTooth.absent||false}
                                                onChange={(e)=>{
                                                    this.props.startSaving();
                                                    this.props.changeTootStatus({toothId:this.props.currentTooth.id, 
                                                                                patientId:this.props.currentPatient.id,
                                                                                absent:e.target.checked, 
                                                                                damaged: this.props.currentTooth.damaged,
                                                                                recovered: this.props.currentTooth.recovered,
                                                                                implanted: this.props.currentTooth.implanted,
                                                                                });
                                                }}
                                                label="Ausente"
                                            />
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Check 
                                            type="switch"
                                            id="swdamaged"
                                            checked={this.props.currentTooth.damaged||false}
                                            onChange={(e)=>{
                                                this.props.startSaving();
                                                this.props.changeTootStatus({toothId:this.props.currentTooth.id, 
                                                                            patientId:this.props.currentPatient.id,
                                                                            absent:this.props.currentTooth.absent,
                                                                            damaged: e.target.checked,
                                                                            recovered: this.props.currentTooth.recovered,
                                                                            implanted: this.props.currentTooth.implanted,
                                                                            });
                                            }}
                                            label="Danificado"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Check 
                                            type="switch"
                                            id="c==swrecovered"
                                            checked={this.props.currentTooth.recovered||false}
                                            onChange={(e)=>{
                                                this.props.startSaving();
                                                this.props.changeTootStatus({toothId:this.props.currentTooth.id, 
                                                                            patientId:this.props.currentPatient.id,
                                                                            absent:this.props.currentTooth.absent,
                                                                            damaged: this.props.currentTooth.damaged,
                                                                            recovered: e.target.checked,
                                                                            implanted: this.props.currentTooth.implanted,
                                                                            });
                                            }}
                                            label="Restaurado"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Check 
                                            type="switch"
                                            id="swimplanted "
                                            checked={this.props.currentTooth.implanted||false}
                                            onChange={(e)=>{
                                                this.props.startSaving();
                                                this.props.changeTootStatus({toothId:this.props.currentTooth.id, 
                                                                            patientId:this.props.currentPatient.id,
                                                                            absent:this.props.currentTooth.absent,
                                                                            damaged: this.props.currentTooth.damaged,
                                                                            recovered: this.props.currentTooth.recovered,
                                                                            implanted: e.target.checked,
                                                                            });
                                                                        }}
                                            label="Implante"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                </Card.Text>
                                </>
    }
                                </div>
                                                                    
                            </LoadingOverlay>
    }
                            
                </Card>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startSaving:()=>dispatch({type:actionTypes.IS_SAVING}),
        changeTootStatus: (toothStatus) => dispatch({ type: actionTypes.EDIT_TOOTH_STATUS,payload:toothStatus })
    }
  }

function mapStateToProps(state){
    
    return {
        isSaving: state.isSaving,
        currentTooth: state.currentTooth,
        currentPatient: state.currentPatientRecord.patient
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(OdontogramHeader);