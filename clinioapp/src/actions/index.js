import {actionTypes} from "../constants/action-types";
export function getGenders() {
    return {type:"GET_GENDERS"};
}

export function getInsurances() {
    return {type:"GET_INSURANCES"};
}

export function getAppointments(dentistId, appointmentDate) {
    return {type:"GET_APPOINTMENTS",payload:{dentistId, appointmentDate}};
}

export function getPatientRecord(id){
    return {type:"GET_PATIENTRECORD",payload:{id}};
}

export function editPatient(patient){
    //console.log(patient);
    return {type:"EDIT_PATIENT",payload:{patient:patient}};
}

export function resetValidation(){
    //console.log(patient);
    return {type:actionTypes.RESET_ALERT};
}