import React, {Component} from 'react';
import {connect} from 'react-redux';
import PatientRecordActionBar from './PatientRecordActionBar';
import {actionTypes} from "../constants/action-types";
import LoaderPanel from './LoadingPanel';
import BlankArea from './BlankArea';
import PatientRecordDetails from './PatientRecordDetails';

import "../assets/css/painelDentista.css";

export class PatientRecord extends Component{
    render(){
        
        return (
            <>
                <PatientRecordActionBar />
                {this.props.isLoadingPatientRecord &&
                    <LoaderPanel />
                }

                {!this.props.isLoadingPatientRecord && this.props.currentPatientRecord === '' &&
                    <BlankArea />
                }

                {!this.props.isLoadingPatientRecord && this.props.currentPatientRecord !== '' &&
                    <PatientRecordDetails />
                }
            </>
        );
    }
}

function mapStateToProps(state){
    
    return {
        currentPatientRecord: state.currentPatientRecord,
        isLoadingPatientRecord: state.isLoadingPatientRecord
    };
}

const mapDispatchToProps = dispatch => {
    return {
      loading: () => dispatch({ type: actionTypes.LOADING_PATIENTRECORD }),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(PatientRecord);

// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {getPatientRecord} from '../actions/index';
// import PatientRecordActionBar from './PatientRecordActionBar';
// import PatientRecordDetails from './PatientRecordDetails';

// import "../assets/css/painelDentista.css";

// export class PatientRecord extends Component{
//     // constructor(props){
//     //     super(props);
//     // }

//     componentDidMount(){
//       //  this.props.getPatientRecord();
//     }

//     render(){
        
//         return (
//             <>
//                 <PatientRecordActionBar />
//                 {this.props.patientRecord !== '' &&  
//                     <PatientRecordDetails />
//                 }
//             </>
//         );
//     }
// }

// function mapStateToProps(state){
//     return {
//         patientRecord: state.patientRecord
//     };
// }

// export default connect(mapStateToProps,{getPatientRecord})(PatientRecord);