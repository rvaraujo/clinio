import PatientService from '../services/patientService.js';

const initialState = { currentPatient:'' };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PATIENT_INFO':
            let patientInfo = PatientService.getPatientInfo(action.payload.patientId);
            // console.log(patientInfo);
        //console.log(action);
            return { ...state, currentPatient: patientInfo}
        default:
            return state
    }
}