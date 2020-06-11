import React from "react";
import {Container, Col, Image, Badge,Button} from 'react-bootstrap';
import Moment from 'moment';
import DataTable from 'react-data-table-component'; 


import Appointment from '../components/appointment.js';

import ScheduleService from '../services/scheduleService.js';


import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../assets/css/painelDentista.css";

import Logo from '../assets/img/logo_clinio.png';
import Avatar from '../assets/img/avatar.jpg';

const columns = [
    {
      name: '',
      selector: 'time',
      maxWidth:'70px',
      minWidth:'70px',
      cell: row=> Moment(row.time).format('HH:mm')
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
            patientId:''
        };

      
        this.appointmentClick=this.appointmentClick.bind(this);
        this.generateAppointmentsMatrix=this.generateAppointmentsMatrix.bind(this);
        this.handleCloseMedicalRecord=this.handleCloseMedicalRecord.bind(this);
        
    }

    appointmentClick(appointment){
      this.setState({patientId: appointment.patientId});
    }

    generateAppointmentsMatrix(){
        let apppointments=[];
        let now = Moment();
        let startTime = Moment(`${now.format('yyy-MM-DDT08:00:00')}`);
        let endTime = Moment(`${now.format('yyy-MM-DDT19:30:00')}`);
   
        for (var d = startTime; d <= endTime; d.add(30,'minute')) {
            apppointments.push({time:d.format()});
        }

        let schedules = ScheduleService.getAppointmentsByDentist('abc','2020-06-10');

        apppointments.forEach(function(value, index, array){
            let item = schedules.filter((appointment)=>{
                return appointment.date ===value.time;
            });
            if(item.length > 0){
                value = {...value, patient:item[0].patient.name, patientId: item[0].patient.id };
                array[index]=value;
            }
        });
        this.setState({appointments: apppointments});
    }

    componentDidMount(){
        this.generateAppointmentsMatrix();
    }

    handleCloseMedicalRecord(){
      this.setState({patientId:''});
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
                                closeMedicalRecord={this.handleCloseMedicalRecord}/>
                  }
                  {this.state.patientId === '' && 
                  <div className="blank-area"></div>
                  }
                 
                    
                  
                </Col>
                <Col className="paddingzero" xs={3}>
                    <DataTable  
                        noDataComponent="Nenhuma Consulta Agendada"
                        title="10 de Junho de 2020"
                        columns={columns}
                        data={this.state.appointments}
                        onRowClicked={this.appointmentClick}
                        fixedHeaderScrollHeight="75vh"
                        fixedHeader />
                    
                </Col>
            </Container>
         
            </>
        );
    }
}