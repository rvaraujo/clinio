import ClinioApi from "../util/clinioApi.js";
const PatientService = {
    getPatientRecord:function(id){
        return ClinioApi.get(`Patient/GetPatientRecord/${id}`).then(function(response){
            return response.data;
        }).catch(function(error){
           console.log('deu erro');
           console.log(error);
        });
    },
    editPatient:function(patient){
        return ClinioApi.put('Patient',patient).then(function(response){
           
                return {isSuccess: response.status === 200, alertMessage: 'Dados do paciente alterados com sucesso.'};
        }).catch(function(error){
          
            return {isSuccess: false,alertMessage: 'Não foi possível alterar os dados do paciente.'};
        });
    }
}
export default PatientService;