using System;
using System.Linq;
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

        public void ChangeToothStatus(string patientId, int toothId, bool absent, bool implanted, bool recovered, bool damaged){
            try{
                var toothStatus = _clinioContext.ToothStatus.FirstOrDefault(ts=>ts.PatientId.Equals(patientId) && ts.ToothId.Equals(toothId));
                if(toothStatus is null)
                    throw new Exception("Cadastro do Paciente corrompido.");
                
                toothStatus.Absent = absent;
                toothStatus.Damaged = damaged;
                toothStatus.Recovered = recovered;
                toothStatus.Implanted = implanted;

                _clinioContext.SaveChanges();
                
            }catch(Exception ex){
                throw new Exception("Ocorreu um erro ao atualizar o status da dentição.",ex);
            }
        }
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