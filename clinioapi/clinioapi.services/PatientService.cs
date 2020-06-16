using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using clinioapi.core.Entities;
using clinioapi.infrastructure;
using Microsoft.EntityFrameworkCore;

namespace clinioapi.services
{
    public class PatientService
    {
        private readonly  ClinioContext _clinioContext ;

        public PatientService(ClinioContext clinioContext)
        {
            _clinioContext =clinioContext;
        }
        public async Task<IList<Patient>> GetAll(){
            return  await _clinioContext.Patients.OrderBy(p=>p.Name).ToListAsync();
        }

        public async Task<Patient> Get(string id){
           
            return  await _clinioContext.Patients.FirstOrDefaultAsync(p=>p.Id.Equals(id));
        }

        private void Clone(Patient source, ref Patient dest){
            dest.Name = source.Name;
               dest.InsuranceId = source.InsuranceId;
               dest.GenderId = source.GenderId;
               dest.DocumentId = source.DocumentId;
               dest.Email = source.Email;   
               dest.Address = source.Address;
               dest.PostalCode = source.PostalCode;
               dest.AddressNumber = source.AddressNumber;
               dest.Complement = source.Complement;
               dest.Neighborhood = source.Neighborhood;
               dest.State = source.State;
               dest.City = source.City;
               dest.Telephone = source.Telephone;
               dest.Complement = source.Complement;
        }

        public void SavePatient(Patient patient){
            if(string.IsNullOrEmpty(patient.Id)){
                var _tooths = _clinioContext.Tooths.OrderBy(t=>t.Id).ToList();
                var _toothStatus = new List<ToothStatus>();
                _tooths.ForEach(t=>{
                    _toothStatus.Add(new ToothStatus{ToothId = t.Id});
                });
                patient.ToothStatus = _toothStatus;
                patient.Id = Guid.NewGuid().ToString();
                _clinioContext.Patients.Add(patient);
            }else{
               var _currentPatient = _clinioContext.Patients.FirstOrDefault(p=>p.Id.Equals(patient.Id));
               Clone(patient, ref _currentPatient);     
            }
            _clinioContext.SaveChanges();
        }

        public async Task<dynamic> GetPatientRecord(string patientId){
            var patientInfo = await _clinioContext.Patients.FirstOrDefaultAsync(p=>p.Id.Equals(patientId));
            var toothStatus = await _clinioContext.ToothStatus.Where(t=>t.PatientId.Equals(patientId)).ToListAsync();
            var performedProcedures = await _clinioContext.PerformedProcedures.Where(p=>p.ToothId != null && p.AppointmentId != null && p.PatientId.Equals(patientId)).ToListAsync();
            var existingProcedures = await _clinioContext.PerformedProcedures.Where(p=>p.ToothId != null && p.AppointmentId == null && p.PatientId.Equals(patientId)).ToListAsync();
            var generalProcedures = await _clinioContext.PerformedProcedures.Where(p=>p.ToothId == null && p.AppointmentId != null && p.PatientId.Equals(patientId)).ToListAsync();
            
            return new {
                patient = patientInfo,
                ToothStatus = toothStatus.Select(t=>new {Id = t.ToothId,Name = t.Tooth.Description,Absent=t.Absent,Damaged = t.Damaged, Recovered = t.Recovered, Implanted= t.Implanted}).ToList(),
                preExistingProcedures = existingProcedures.Select(p=>new{ToothId=p.ToothId, Description= p.Procedure.Description}).ToList(),
                performedProcedures = performedProcedures.Select(p=>new{ToothId= p.ToothId, Date = p.Appointment.Date,Doctor = p.Appointment.Dentist.ToString(),Description=p.Procedure.Description}).ToList(),
                procedures = generalProcedures.Select(p=>new{Date = p.Appointment.Date,Doctor = p.Appointment.Dentist.ToString(),Description=p.Procedure.Description}).ToList()
            };
        }
    }
}