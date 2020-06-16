namespace clinioapi.webapi.ViewModels
{
    public class UserViewModel
    {
        public string Id { get; set; }
        
        public string Login { get; set; }
        
        public string Name { get; set; }
        
        public string Password { get; set; }
       
        public string ProfileId { get; set; }
        
        public string Email { get; set; }

        public bool? Active { get; set; }

        public string Picture { get; set; }
    }
}