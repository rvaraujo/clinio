import {takeEvery, call, put} from 'redux-saga/effects';
import AppointmentsService from '../services/AppointmentsService';
import PatientService from '../services/PatientService';
import ParametersService from '../services/ParametersService';
import {actionTypes} from "../constants/action-types";

export default function* watcherSaga(){
    yield takeEvery("GET_APPOINTMENTS",getAppointmentsSaga);
    yield takeEvery("GET_PATIENT_RECORD",getPatientRecordSaga);
    yield takeEvery("GET_GENDERS",getGendersSaga);
    yield takeEvery("GET_INSURANCES",getInsurancesSaga);
    yield takeEvery("GET_PROCEDURES",getProceduresSaga);
    yield takeEvery("EDIT_PATIENT",editPatientSaga);
    yield takeEvery("EDIT_TOOTH_STATUS",editToothStatusSaga);
    yield takeEvery("SAVE_PROCEDURE",saveProcedureSaga);
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
    return ParametersService.getGenders().then(response=>{return response});
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
    return ParametersService.getInsurances().then(response=>{return response});
}

function* editPatientSaga(action){
    try{
        const payload = yield call(editPatient,action.payload);
        yield put({type:actionTypes.PATIENT_EDITED, payload});

    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function editPatient(patient){
   
    return PatientService.editPatient(patient).then(function(res){
        return {patient:patient, isSuccess: res.isSuccess, hasError: !res.isSuccess, alertMessage: res.alertMessage}});
}

function* editToothStatusSaga(action){
    try{
        const payload = yield call(editToothStatus,action.payload);
        if(payload.isSuccess){
            
            const getInfoUpdatedPayload = yield call(getPatientRecord,action.payload.patientId);
            yield put({type:actionTypes.TOOTH_STATUS_CHANGED, payload:{...getInfoUpdatedPayload,toothId:action.payload.toothId}});
        }
        
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function editToothStatus(toothStatus){
    return PatientService.editToothStatus(toothStatus).then(function(res){
        return res;
    });
}

function* saveProcedureSaga(action){
    try{
        
       const payload=  yield call(saveProcedures,action.payload);
       yield put({type:actionTypes.PROCEDURE_SAVED, payload});
       if(payload.isSuccess){
           
        const getInfoUpdatedPayload = yield call(getPatientRecord,action.payload.patientId);
        yield put({type:actionTypes.TOOTH_STATUS_CHANGED, payload:{...getInfoUpdatedPayload,toothId:action.payload.toothId}});
       }
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function saveProcedures(procedure){
    return PatientService.saveProcedure(procedure).then(function(res){
        return res;
    });
}

function* getProceduresSaga(){
    try{
        const payload = yield call(getProcedures);
        yield put({type:actionTypes.PROCEDURES_LOADED, payload});
    }catch(e){
        yield put({type:"API_ERRORED", payload:e});
    }
}

function getProcedures(){
    return ParametersService.getProcedures().then(response=>{return response});
}