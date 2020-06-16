using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using clinioapi.core.Entities;
using clinioapi.infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace clinioapi.services
{
    public class AppointmentService : BaseService
    {
        public AppointmentService(ClinioContext clinioContext) : base(clinioContext){}

        public async Task<IList<dynamic>> Get(string dentistId, DateTime date){
            var appointments =  await _clinioContext.Appointments.Where(a=> a.DentistId.Equals(dentistId) && a.Date.Date.Equals(date.Date)).OrderBy(a=>a.Date).ToListAsync();
            var startTime = date.Date.Add(new TimeSpan(8,0,0));
            var endTime = date.Date.Add(new TimeSpan(19,30,0));
            var result = new List<dynamic>();

            for (DateTime t = startTime; t <= endTime; t = t.AddMinutes(30))
            {
                var appointment = appointments.FirstOrDefault(a=>a.Date.Equals(t));
                if(appointment is null)
                    result.Add(new {Time=t});
                else
                    result.Add(new {Id=appointment.Id,Time=t,Patient=appointment.Patient.Name, appointment.PatientId,appointment.DentistId});
            }
            return result;
        }

       
    }
}