import ClinioApi from "../util/clinioApi.js";

const PatientService = {
    getPatientInfo:function(id){
        return ClinioApi.get(`Patient/GetPatientRecord/${id}`).then(function(response){
            return response.data;
        });
    }
}
export default PatientService;