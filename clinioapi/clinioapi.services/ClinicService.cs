using System;
using clinioapi.core.Entities;
using clinioapi.infrastructure;

namespace clinioapi.services
{
    public class ClinicService : BaseService
    {
        public ClinicService(ClinioContext clinioContext) : base(clinioContext){}

        //  public void RegisterProcedure(string patientId, string appointmentId, string procedureId, string comments){
        //     RegisterProcedure(patientId,null,appointmentId,procedureId,comments);
        // }
        // public void RegisterProcedure(string patientId, int? toothId ,string procedureId, string comments){
        //     RegisterProcedure(patientId,toothId,null,procedureId,comments);
        // }
        public void RegisterProcedure(string patientId, int? toothId, string appointmentId,string procedureId, string comments){
            try{
                var newProcedure = new PerformedProcedures{
                PatientId = patientId,
                ToothId = toothId,
                AppointmentId  = appointmentId,
                ProcedureId = procedureId,
                Comments = comments
            };

            _clinioContext.PerformedProcedures.Add(newProcedure);
            _clinioContext.SaveChanges();
            }catch(Exception ex){
                throw new Exception("Ocorreu um erro ao registrar um procedimento no prontuário do paciente",ex);
            }
            
        }
    }
}