import ClinioApi from "../util/clinioApi.js";
const ParametersService = {
    getGenders:()=>{
        return ClinioApi.get('Parameters/GetGenders').then(function(response){
            return response.data;
        });
    },
    getInsurances:()=>{
        return ClinioApi.get('Parameters/GetInsurances').then(function(response){
            return response.data;
        });
    },
    getTooths:()=>{
        return ClinioApi.get('Parameters/GetTooths').then(function(response){
            return response.data;
        });
    }
};
export default ParametersService;