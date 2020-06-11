export default {
    getPatientInfo(patient) {
        return { type: 'GET_PATIENT_INFO', payload: patient }
    }
}