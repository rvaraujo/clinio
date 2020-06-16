import React from "react";
import { Tab } from 'semantic-ui-react'
import {Button} from 'react-bootstrap';
import Loader from 'react-loader-spinner'
import PatientInfo from '../components/patientInfo.js';
import Odontogram from '../components/odontogram.js';

import PatientService from '../services/patientService.js';

export default class Appointment extends React.Component {
    constructor(props) {
        super(props);


        this.state={
            currentPatient:'',
            isLoading:true
        };

        this.generateServiceCarePanels=this.generateServiceCarePanels.bind(this);
        this.openPatientRecord=this.openPatientRecord.bind(this);
    }

    openPatientRecord(patientId){
      let self = this;
        PatientService.getPatientInfo(patientId).then(function(res){
          self.setState({currentPatient: res.patient,isLoading:false,procedures:res.procedures, performedProcedures:res.performedProcedures,preExistingProcedures:res.preExistingProcedures,currentToothStatus:res.toothStatus});
        });
    }

    componentDidMount(){
      this.openPatientRecord(this.props.patientId);
    }

    

    generateServiceCarePanels(){
        return [
          {
            menuItem: 'Dados do Paciente',
            render: () => <Tab.Pane className="entireheight" attached={false}><PatientInfo  currentPatient={this.state.currentPatient} /></Tab.Pane>,
          },
          {
            menuItem: 'Odontograma',
            render: () => <Tab.Pane className="entireheight" attached={false}><Odontogram 
                                  
                                  openAddGeneralProcedureForm={this.props.openAddGeneralProcedureForm}
                                  openAddPerformedProcedureForm={this.props.openAddPerformedProcedureForm}
                                  openAddPreExistingProcedureForm={this.props.openAddPreExistingProcedureForm}
                                  currentToothStatus={this.state.currentToothStatus} 
                                  preExistingProcedures= {this.state.preExistingProcedures} 
                                  performedProcedures={this.state.performedProcedures}
                                  procedures={this.state.procedures}
                                  /></Tab.Pane>,
          },
          {
            menuItem: 'Histórico',
            render: () => <Tab.Pane className="entireheight" attached={false}>Tab 3 Content</Tab.Pane>,
          },
        ];
       }

    render(){
      if (this.state.isLoading){
        return (
          <div className="loading-area">
          <Loader
   type="Oval"
   color="#00BFFF"
   height={100}
   width={100}

/>
      </div>
        );
        
      }else{
          return(
              <>
                  <div className="action-bar">
                      <Button variant="info"><i className="fas fa-microphone-alt"></i>Chamar Paciente</Button>
                      <Button variant="info"><i className="fas fa-file-medical-alt"></i> Emitir Receita</Button>
                      <Button variant="info"><i className="fas fa-notes-medical"></i>Emitir Atestado</Button>
                      <Button variant="info"><i className="far fa-calendar-check"></i>Agendar Retorno</Button>
                      <Button variant="info" onClick={this.props.closeMedicalRecord}><i className="far fa-window-close"></i>Fechar Prontuário</Button>
                  </div>
                  <Tab menu={{ pointing: true }} panes={this.generateServiceCarePanels()} />
              </>
          );
      }
    }
}