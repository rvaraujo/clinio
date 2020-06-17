import React, {Component} from 'react';
import {connect} from 'react-redux';
import DataTable from 'react-data-table-component';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import {actionTypes} from "../constants/action-types";


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
    cell: row=> <div className="appointment-time">{moment(row.time, "YYY-MM-DDTHH:mm:ss-03:00").format("HH:mm")}</div>
    },
    {
      name: '',
      selector: 'patient',
      ignoreRowClick: false,
    cell: row => row.patient
    }
  ];

export class AppointmentList extends Component{
        constructor(props){
        super(props);
        this.appointmentClick=this.appointmentClick.bind(this);
    }

    componentDidMount(){
        let dentistId = 'd999bbd4-b513-4cb0-b1f0-93bd1384b27a';
        let appointmentDate = '2020-06-12';
        this.props.loading();
        this.props.getAppointments(dentistId,appointmentDate);
    }

    appointmentClick(row){
        if(row.patientId === undefined)
          {
            this.props.setCurrentAppointment('','');
            this.props.closePatientRecord();
          }
        else
        {
          this.props.setCurrentAppointment(row.id, row.patientId);
          this.props.openPatientRecord(row.patientId);
        }
    }

    render(){
        return (
            <>
              <DataTable  noDataComponent="Nenhuma Consulta Agendada"
                          title="teste"
                          columns={columns}
                          data={this.props.appointments}
                          progressPending={this.props.isLoadingAppointments}
                          progressComponent={<CustomLoader />}
                          onRowClicked={this.appointmentClick}
                          fixedHeaderScrollHeight="75vh"
                          fixedHeader />
            </>
        );
    }
}

function mapStateToProps(state){
    
    return {
        isLoadingAppointments: state.isLoadingAppointments,
        appointments: state.appointments,
        currentPatientRecord: state.currentPatientRecord
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
      loading: () => dispatch({ type: actionTypes.LOADING_APPOINTMENTS }),
      closePatientRecord:()=>dispatch({type:actionTypes.CLOSE_PATIENT_RECORD}),
      setCurrentAppointment:(appointmentId, patientId)=>dispatch({type:actionTypes.SET_CURRENT_APPOINTMENT_ID,payload:{appointmentId,patientId}}),
      openPatientRecord:(patientId)=>{
          dispatch({type:actionTypes.OPEN_PATIENT_RECORD});
          dispatch({type:"GET_PATIENT_RECORD",payload:{patientId}});
        },
      getAppointments:(dentistId, appointmentDate)=>dispatch({ type: "GET_APPOINTMENTS",payload:{dentistId, appointmentDate}})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AppointmentList);