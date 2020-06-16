namespace clinioapi.webapi.ViewModels
{
    public class ChangeToothStatusViewModel
    {
        public string PatientId {get;set;}
        public int ToothId{get;set;}
        public bool Absent{get;set;}
        public bool Implanted{get;set;}
        public bool Recovered{get;set;}
        public bool Damaged{get;set;}
    }
}