using System;

namespace clinioapi.webapi.ViewModels
{
    public class PatientViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string DocumentId { get; set; }
        public string  GenderId { get; set; }
        public string  InsuranceId { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string AddressNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Complement { get; set; }
        public string Neighborhood { get; set; }
        public string Telephone { get; set; }
    }
}