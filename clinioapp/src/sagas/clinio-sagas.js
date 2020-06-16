import {takeEvery, call, put} from 'redux-saga/effects';
import AppointmentsService from '../services/AppointmentsService';
import PatientService from '../services/PatientService';
import {actionTypes} from "../constants/action-types";

export default function* watcherSaga(){
    yield takeEvery("GET_APPOINTMENTS",getAppointmentsSaga);
    yield takeEvery("GET_PATIENT_RECORD",getPatientRecordSaga);
    yield takeEvery("GET_GENDERS",getGendersSaga);
    yield takeEvery("GET_INSURANCES",getInsurancesSaga);
    yield takeEvery("EDIT_PATIENT",editPatientSaga);
}

function* getAppointmentsSaga(action){
    try{
        
        const payload = yield call(getAppointments,action.payload.dentistId, action.payload.appointmentDate);
        
        yield put({type:actionTypes.APPOINTMENTS_LOADED, payload});
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function getAppointments(dentistId, appointmentDate){
    return AppointmentsService.getAppointmentsByDentist(dentistId,appointmentDate).then(response=>{return response;});
}

function* getPatientRecordSaga(action){
    try{
        const payload = yield call(getPatientRecord,action.payload.patientId);
        yield put({type:actionTypes.PATIENT_RECORD_OPENED, payload});
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function getPatientRecord(patientId){
    return PatientService.getPatientRecord(patientId).then(response=>{return response;});
}

function* getGendersSaga(){
    try{
        const payload = yield call(getGenders);
        yield put({type:actionTypes.GENDERS_LOADED, payload});
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function getGenders(){
    return fetch("https://clinioapi.herokuapp.com/Parameters/GetGenders").then(response =>
    response.json()
  );
}

function* getInsurancesSaga(){
    try{
        const payload = yield call(getInsurances);
        yield put({type:actionTypes.INSURANCES_LOADED, payload});
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function getInsurances(){
    return fetch("https://clinioapi.herokuapp.com/Parameters/GetInsurances").then(response =>
    response.json()
  );
}

function* editPatientSaga(action){
    try{
        const payload = yield call(editPatient,action.payload);
        console.log(payload);
        yield put({type:actionTypes.PATIENT_EDITED, payload});

    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function editPatient(patient){
   
    return PatientService.editPatient(patient).then(function(res){
        return {patient:patient, isSuccess: res.isSuccess, hasError: !res.isSuccess, alertMessage: res.alertMessage}});
}