
import {actionTypes} from "../constants/action-types";

const initialState = {
  isLoadingPatientRecord: false,
  isLoadingAppointments: false,
  appointments:[],
  currentPatientRecord: '',
  currentPatient:'',
  genders: [],
  insurances: [],
  isSuccess:false,
  showError: false,
  alertMessage:''
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

  return state;
}

export default rootReducer;