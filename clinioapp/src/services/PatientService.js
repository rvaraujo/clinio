import ClinioApi from "../util/clinioApi.js";
import {token} from '../constants/token' ;

const PatientService = {
    getPatientRecord:function(id){
        return ClinioApi.get(`Patient/GetPatientRecord/${id}`,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
            return response.data;
        }).catch(function(error){
           console.log('deu erro');
           console.log(error);
        });
    },
    editPatient:function(patient){
        return ClinioApi.put('Patient',patient,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
           
                return {isSuccess: response.status === 200, alertMessage: 'Dados do paciente alterados com sucesso.'};
        }).catch(function(error){
          
            return {isSuccess: false,alertMessage: 'Não foi possível alterar os dados do paciente.'};
        });
    }
}
export default PatientService;
