
import {actionTypes} from "../constants/action-types";

const initialState = {
  isLoadingPatientRecord: false,
  isLoadingAppointments: false,
  appointments:[],
  currentPatientRecord: '',
  currentPatient:'',
  genders: [],
  insurances: [],
  procedures:[],
  isSuccess:false,
  showError: false,
  alertMessage:'',
  toothPerformedProcedures:[],
  toothPreExistingProcedures:[],
  currentTooth:'',
  isSaving:false,
  currentAppointmentId:'',
  currentPatientId:''
};

function rootReducer(state = initialState, action) {
  if (action.type === actionTypes.LOADING_APPOINTMENTS) {
    return Object.assign({}, state, {
      isLoadingAppointments: true
    });
  }

  if (action.type === actionTypes.APPOINTMENTS_LOADED) {
    return Object.assign({}, state, {
      isLoadingAppointments: false, appointments: state.appointments.concat(action.payload)
    });
  }

  if (action.type === actionTypes.PATIENT_RECORD_OPENED) {
    return Object.assign({}, state, {
      isLoadingPatientRecord: false, currentPatientRecord: action.payload
    });
  }

  if (action.type === actionTypes.OPEN_PATIENT_RECORD) {
    return Object.assign({}, state, {
      isLoadingPatientRecord: true, currentPatientRecord: '',alertMessage:'', showError: false, isSuccess: false
    });
  }

  if (action.type === actionTypes.PATIENT_INFO_CHANGED) {
    return Object.assign({}, state, {
      currentPatientRecord: {...state.currentPatientRecord,patient:{...state.currentPatientRecord.patient,...action.payload}}
    });
  }

  if (action.type === actionTypes.GENDERS_LOADED) {
    if(state.genders.length === 0)
    return Object.assign({}, state, {
        genders: state.genders.concat(action.payload)
    });
  }

  if (action.type === actionTypes.INSURANCES_LOADED) {
    if(state.insurances.length === 0)
    return Object.assign({}, state, {
        insurances: state.insurances.concat(action.payload)
    });
  }

  if (action.type === actionTypes.PROCEDURES_LOADED) {
    if(state.procedures.length === 0)
    return Object.assign({}, state, {
      procedures: state.procedures.concat(action.payload)
    });
  }

  if (action.type === actionTypes.PATIENT_EDITED) {
    return Object.assign({}, state, {
      currentPatientRecord: {...state.currentPatientRecord,patient:{...action.payload.patient}},
      isSuccess: action.payload.isSuccess,
      showError: action.payload.hasError,
      alertMessage: action.payload.alertMessage
    });
  }

  if (action.type === actionTypes.CLEAR_MESSAGES) {
    return Object.assign({}, state, {
      isSuccess: false,
      showError: false,
      alertMessage: ''
    });
  }

  if (action.type === actionTypes.CLOSE_PATIENT_RECORD) {
    return Object.assign({}, state, {
      currentPatientRecord:''
    });
  }

  if (action.type === actionTypes.GET_TOOTH_PROCEDURES) 
  {
    let tooth = state.currentPatientRecord.toothStatus.filter((tooth)=>{
      return tooth.id ===action.payload;
    })[0];
    let proceduresPerformed = state.currentPatientRecord.performedProcedures.filter((tooth)=>{
      return tooth.toothId === action.payload;
    });
    let proceduresPreExisting = state.currentPatientRecord.preExistingProcedures.filter((tooth)=>{
      return tooth.toothId === action.payload;
    });
    return Object.assign({}, state, {
      toothPerformedProcedures:state.toothPerformedProcedures.slice(state.toothPerformedProcedures.length+1).concat(proceduresPerformed),
      toothPreExistingProcedures:state.toothPreExistingProcedures.slice(state.toothPerformedProcedures.length+1).concat(proceduresPreExisting),
      currentTooth: tooth
    });
  }

  if (action.type === actionTypes.TOOTH_STATUS_CHANGED){
    console.log(action.payload);
    let tooth = action.payload.toothStatus.filter((tooth)=>{
      return tooth.id ===action.payload.toothId;
    })[0];
    return Object.assign({},state,{
      toothPerformedProcedures: action.payload.performedProcedures,
      toothPreExistingProcedures:action.payload.preExistingProcedures,
      currentPatientRecord:{...state.currentPatientRecord,procedures:action.payload.procedures ,toothStatus:action.payload.toothStatus},
      currentTooth:tooth,
      isSaving: false
    });
  }

  if (action.type === actionTypes.IS_SAVING){
    return Object.assign({},state,{
      isSaving: true
    });
  }

  if (action.type === actionTypes.IS_SAVED){
    return Object.assign({},state,{
      isSaving: false
    });
  }

  if (action.type === actionTypes.SET_CURRENT_APPOINTMENT_ID){
    return Object.assign({},state,{
      currentAppointmentId: action.payload.appointmentId,
      currentPatientId : action.payload.patientId
    });
  }

  if (action.type === actionTypes.PROCEDURE_SAVED){
    console.log(action.payload);
    return Object.assign({},state,{
      isSaving: false,
      isSuccess: action.payload.isSuccess,
      showError: !action.payload.isSuccess,
      alertMessage: action.payload.alertMessage
    });
  }
  return state;
}

export default rootReducer;