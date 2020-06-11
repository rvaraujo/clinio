import Moment from 'moment';
const ScheduleService = {
    getAppointmentsByDentist:function(dentistId, appointmentDate){
        return [
            {date:Moment('2020-06-10T08:00:00').format(), patient:{name:'Rafael Vieira de Araujo', id:'abc'}, dentistId:'aqwdf' },
            {date:Moment('2020-06-10T08:30:00').format(), patient:{name:'Camila Faria', id:'wert'}, dentistId:'aqwdf' },
            {date:Moment('2020-06-10T13:00:00').format(), patient:{name:'Eriberto Araujo', id:'gthg'}, dentistId:'aqwdf' },
            {date:Moment('2020-06-10T17:00:00').format(), patient:{name:'Francisca Maciel', id:'fgrg'}, dentistId:'aqwdf' }
        ];
    }
}
export default ScheduleService;