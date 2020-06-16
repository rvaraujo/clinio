import React, {Component} from 'react';
import { Tab } from 'semantic-ui-react';
import PatientInfo from './PatientInfo';

export  default class PatientRecordDetails extends Component{
    constructor(props){
        super(props);

        this.generatePatientRecordPanels=this.generatePatientRecordPanels.bind(this);
    }

    generatePatientRecordPanels(){
        return [
            {
              menuItem: 'Dados do Paciente',
              render: () => <Tab.Pane className="entireheight" attached={false}><PatientInfo /></Tab.Pane>,
            },
        ];
    }

    render(){
        return (
            <>
                 <Tab menu={{ pointing: true }} panes={this.generatePatientRecordPanels()} />
            </>
        );
    }
}
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import { Tab } from 'semantic-ui-react';
// import PatientInfo from './PatientInfo';
// import {actionTypes} from "../constants/action-types";


// export  class PatientRecordDetails extends Component{
//     constructor(props){
//         super(props);

//         this.state={
//             currentPatient: this.props.patientRecord.patient
//         };

//         this.generatePatientRecordPanels=this.generatePatientRecordPanels.bind(this);
//     }

//    componentDidMount(){
//        this.props.loading();
//    }

//     generatePatientRecordPanels(){
      
//         return [
//             {
//               menuItem: 'Dados do Paciente',
//               render: () => <Tab.Pane className="entireheight" attached={false}><PatientInfo  currentPatient={this.state.currentPatient} /></Tab.Pane>,
//             },
//             // {
//             //   menuItem: 'Odontograma',
//             //   render: () => <Tab.Pane className="entireheight" attached={false}><Odontogram 
                                    
//             //                         openAddGeneralProcedureForm={this.props.openAddGeneralProcedureForm}
//             //                         openAddPerformedProcedureForm={this.props.openAddPerformedProcedureForm}
//             //                         openAddPreExistingProcedureForm={this.props.openAddPreExistingProcedureForm}
//             //                         currentToothStatus={this.state.currentToothStatus} 
//             //                         preExistingProcedures= {this.state.preExistingProcedures} 
//             //                         performedProcedures={this.state.performedProcedures}
//             //                         procedures={this.state.procedures}
//             //                         /></Tab.Pane>,
//             // },
//             // {
//             //   menuItem: 'Histórico',
//             //   render: () => <Tab.Pane className="entireheight" attached={false}>Tab 3 Content</Tab.Pane>,
//             // },
//           ];
//     }

//     render(){
//         if(!this.props.isLoadingPatientRecord){
//         return(
//             <>
//                 <Tab menu={{ pointing: true }} panes={this.generatePatientRecordPanels()} />
//             </>
//         );
//         }else{
//            return (
//                <>
//                <div>teste</div>
//                </>
//            ); 
//         }

//     }
// }

// function mapStateToProps(state){
//     console.log(state);
//     return {
//         patientRecord: state.patientRecord,
//         isLoadingPatientRecord: state.isLoadingPatientRecord
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//       // dispatching plain actions
//       loading: () => dispatch({ type: actionTypes.LOADING_PATIENTRECORD }),
//      // decrement: () => dispatch({ type: 'DECREMENT' }),
//      // reset: () => dispatch({ type: 'RESET' })
//     }
//   }

// export default connect(mapStateToProps,mapDispatchToProps)(PatientRecordDetails);