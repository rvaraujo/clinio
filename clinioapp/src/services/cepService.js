import axios from "axios";
const CepService = {
    GetAddressByPostalCode:function(postalCode){
        let _axios = axios.create({responseType:"application/json"});
        return _axios.get('https://viacep.com.br/ws/'+postalCode+'/json/')
            .then(function(response){
                if(response.status === 200){
                    return {address: response.data.logradouro, city: response.data.localidade, state: response.data.uf,neighborhood: response.data.bairro }
                }else{
                    return null;
                }
            });
    }
}
export default CepService;