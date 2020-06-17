import ClinioApi from "../util/clinioApi.js";
import {token} from '../constants/token' ;
const ParametersService = {
    getGenders:function(){
        return ClinioApi.get(`/Parameters/GetGenders`,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
            return response.data;
        }).catch(function(error){
           console.log('deu erro');
           console.log(error);
        });
    },
    getInsurances:function(){
        return ClinioApi.get(`/Parameters/GetInsurances`,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
            return response.data;
        }).catch(function(error){
           console.log('deu erro');
           console.log(error);
        });
    },
    getProcedures:function(){
        return ClinioApi.get(`/Parameters/GetProcedures`,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
            return response.data;
        }).catch(function(error){
           console.log('deu erro');
           console.log(error);
        });
    },
}
export default ParametersService;