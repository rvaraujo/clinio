import ClinioApi from "../util/clinioApi.js";


const ScheduleService = {
    getAppointmentsByDentist:function(dentistId, appointmentDate){
       // console.log(dentistId);
        //console.log(appointmentDate);
        return ClinioApi.get(`/Appointment/${dentistId}/${appointmentDate}`).then(function(response){
            console.log(response.data);
            return response.data;
        });
        
    }
}
export default ScheduleService;