import ClinioApi from "../util/clinioApi.js";
import {token} from '../constants/token' ;
const ScheduleService = {
    getAppointmentsByDentist:function(dentistId, appointmentDate){
       
        return ClinioApi.get(`/Appointment/${dentistId}/${appointmentDate}`,{headers:{Authorization:`Bearer ${token}`}}).then(function(response){
            
            return response.data;
        });
        
    }
}
export default ScheduleService;