import ClinioApi from "../util/clinioApi.js";
const ScheduleService = {
    getAppointmentsByDentist:function(dentistId, appointmentDate){
       
        return ClinioApi.get(`/Appointment/${dentistId}/${appointmentDate}`).then(function(response){
            
            return response.data;
        });
        
    }
}
export default ScheduleService;