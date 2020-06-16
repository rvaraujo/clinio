using clinioapi.core.Entities;
using Microsoft.AspNetCore.Identity;

namespace clinioapi.core.Util
{
    public static class Security
    {
        public static string HashPassword(User user,string password){
            var passwordHasher = new PasswordHasher<User>();
            return passwordHasher.HashPassword(user,password);
        }

        public static bool PasswordVerified(User user,string password){
            var passwordHasher = new PasswordHasher<User>();
            return Microsoft.AspNetCore.Identity.PasswordVerificationResult.Success  == passwordHasher.VerifyHashedPassword(user,user.Password,password);
        }
    }
}