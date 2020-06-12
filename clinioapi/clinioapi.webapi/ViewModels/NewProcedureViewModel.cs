namespace clinioapi.webapi.ViewModels
{
    public class NewProcedureViewModel
    {
        public string PatientId { get; set; }
        public int? ToothId { get; set; }
        public string AppointmentId { get; set; }
        public string ProcedureId { get; set; }
        public string Comments { get; set; }
       
    }
}