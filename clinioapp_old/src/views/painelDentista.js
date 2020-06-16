import React from "react";
import {Container, Col, Image, Badge, Modal} from 'react-bootstrap';
import Moment from 'moment';
import ReactMoment from 'react-moment';
import ToothProcedure from '../components/toothProcedure.js';
import DataTable from 'react-data-table-component'; 
import Appointment from '../components/appointment.js';
import Loader from 'react-loader-spinner'
import ScheduleService from '../services/scheduleService.js';


import "../assets/css/painelDentista.css";

import Logo from '../assets/img/logo_clinio.png';
import Avatar from '../assets/img/avatar.jpg';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


const CustomLoader = () => (
  <Loader
	     type="Oval"
	     color="#00BFFF"
	     height={100}
	     width={100}

	  />
);

const columns = [
    {
      name: '',
      selector: 'time',
      maxWidth:'70px',
      minWidth:'70px',
      cell: row=> Moment(row.time, "YYY-MM-DDTHH:mm:ss-03:00").format("HH:mm")
    },
    {
      name: '',
      selector: 'patient',
      ignoreRowClick: false,
    cell: row => row.patient
    }
  ];

  

  export default class PainelDentista extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            appointments:[],
            patientId:'',
            showModal:false,
            modalInfo:{title:'', body:''},
            isLoadingAppointments: true
        };

        
        this.appointmentClick=this.appointmentClick.bind(this);
        this.generateAppointmentsMatrix=this.generateAppointmentsMatrix.bind(this);
        this.handleCloseMedicalRecord=this.handleCloseMedicalRecord.bind(this);
        this.handleAddPreExistigProcedureClick=this.handleAddPreExistigProcedureClick.bind(this);
        this.handleAddPerformedProcedureClick=this.handleAddPerformedProcedureClick.bind(this);
        this.handleAddGeneralProcedureClick=this.handleAddGeneralProcedureClick.bind(this);
        this.handleModalClose=this.handleModalClose.bind(this);
        this.savePreExistigProcedure=this.savePreExistigProcedure.bind(this);
        this.savePerformedProcedure=this.savePerformedProcedure.bind(this);
        this.saveGeneralProcedure=this.saveGeneralProcedure.bind(this);
        
    }

    appointmentClick(appointment){
      this.setState({patientId: ''},function(){
        this.setState({patientId: appointment.patientId === undefined?'':appointment.patientId});
      });
      
    }

    savePreExistigProcedure(patientId, toothId, procedureId, comments){
      return {isSuccess:true,message:'Procedimento registrado com sucesso'};
    }

    savePerformedProcedure(patientId, toothId, procedureId, comments){
      return {isSuccess:false,message:'Ocorreu um erro no backend'};
    }

    saveGeneralProcedure(patientId, procedureId, comments){
      return {isSuccess:true,message:'Procedimento registrado com sucesso'};
    }

    handleAddPreExistigProcedureClick(tooth){
      this.setState({showModal: true,modalInfo:{title:'Registrar Procedimento Pré-Existente',body:<ToothProcedure showTooth={true} patientId={this.state.patientId} saveAction={this.savePreExistigProcedure} closeForm={this.handleModalClose} tooth={tooth}/>}});
    }

    handleAddPerformedProcedureClick(tooth){
      this.setState({showModal: true,modalInfo:{title:'Registrar Procedimento Realizado',body:<ToothProcedure  showTooth={true} patientId={this.state.patientId} saveAction={this.savePerformedProcedure} closeForm={this.handleModalClose} tooth={tooth}/>}});
    }

    handleAddGeneralProcedureClick(){
      this.setState({showModal: true,modalInfo:{title:'Registrar Procedimento Realizado',body:<ToothProcedure showTooth={false} patientId={this.state.patientId} saveAction={this.saveGeneralProcedure} closeForm={this.handleModalClose}/>}});
    }

    generateAppointmentsMatrix(){
        let self = this;
        

        ScheduleService.getAppointmentsByDentist('d999bbd4-b513-4cb0-b1f0-93bd1384b27a','2020-06-12').then(function(res){
          self.setState({appointments: res, isLoadingAppointments: false});
        });
    }

    componentDidMount(){
        this.generateAppointmentsMatrix();
    }

    handleCloseMedicalRecord(){
      this.setState({patientId:''});
    }

    handleModalClose(){
      this.setState({showModal:false});
    }

    render(){
     
        return (
            <>
            <div className="header">
                <Col className="header-brand">
                    <img className="logo" src={Logo} alt="CLINIO - SISTEMA DE GERENCIAMENTO DE CONSULTÓRIO ODONTOLÓGICO" />
                    <label className="appname">CLINIO</label>
                </Col>
                <Col className="header-content">
                    <i className="far fa-bell incomingmessage"></i><Badge className="header-badge" variant="light">9</Badge>
                    <Image className="avatar" roundedCircle src={Avatar} alt="Usuário Conectado" />
                </Col>
            </div>
            <Container className="boxFlex fullheight content" fluid>
                <Col xs={9}>
                  {this.state.patientId !== '' && 
                  <Appointment  patientId={this.state.patientId} 
                                closeForm={this.handleModalClose}
                                openAddGeneralProcedureForm={this.handleAddGeneralProcedureClick}
                                openAddPerformedProcedureForm={this.handleAddPerformedProcedureClick}
                                openAddPreExistingProcedureForm={this.handleAddPreExistigProcedureClick}
                                closeMedicalRecord={this.handleCloseMedicalRecord}/>
                  }
                  {this.state.patientId === '' && 
                  <div className="blank-area"></div>
                  }
                </Col>
                <Col className="paddingzero" xs={3}>
                    <DataTable  
                        noDataComponent="Nenhuma Consulta Agendada"
                        title={<ReactMoment locale="pt-br" format="LL" date={Moment()}/>}
                        columns={columns}
                        data={this.state.appointments}
                        progressPending={this.state.isLoadingAppointments}
                        progressComponent={<CustomLoader />}
                        onRowClicked={this.appointmentClick}
                        fixedHeaderScrollHeight="75vh"
                        fixedHeader />
                    
                </Col>
            </Container>
            <Modal
      show={this.state.showModal}
      backdrop="static"
      onHide={() => this.setState({showModal:false})}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="procedure-area">
        <Modal.Title  id="contained-modal-title-vcenter">
          {this.state.modalInfo.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {this.state.modalInfo.body}
      </Modal.Body>
    </Modal>
            </>
        );
    }
}