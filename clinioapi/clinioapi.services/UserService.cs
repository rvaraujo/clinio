using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using clinioapi.core.Entities;
using clinioapi.core.Exceptions;
using clinioapi.core.Util;
using clinioapi.infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace clinioapi.services
{
    public class UserService : BaseService
    {
        private readonly IConfiguration _configuration;

        public UserService(ClinioContext clinioContext, IConfiguration configuration) : base(clinioContext){
            _configuration = configuration;
        }

         private void Clone(User source, ref User dest){
            dest.Name = source.Name;
            dest.Login = source.Login;
            dest.ProfileId = source.ProfileId;
            dest.Active = source.Active;
            dest.Email = source.Email;   
            dest.Picture = source.Picture;
        }

        public void SaveUser(User user ){
            string action ="";
            try{
                if(string.IsNullOrEmpty(user.Id)){
                    action = "Cadastrar";
                    user.Id = Guid.NewGuid().ToString();
                    user.Password = Security.HashPassword(user, user.Password);
                    _clinioContext.Users.Add(user);
                }else{
                    action = "Editar";
                    var _currentUser = _clinioContext.Users.FirstOrDefault(u=>u.Id.Equals(user.Id));
                    Clone(user, ref _currentUser);     
                }
                _clinioContext.SaveChanges();
            }catch(Exception exception){
                throw new Exception($"Não foi possível ${action} o Usuário.", exception);
            }
              
        }

        public string Authenticate(string login, string password){
            var _currentUser = _clinioContext.Users.FirstOrDefault(u=>u.Login.Equals(login));

             if(_currentUser is null)
                 throw new Exception("Usuário inválido.");

             if(!Security.PasswordVerified(_currentUser,password))
                throw new Exception("Senha inválida.");
            
            return GenerateToken(_currentUser);
        }

        private string GenerateToken(User user){
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("ClinioApiKey"));
            var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Sid, user.Id),
                        new Claim(ClaimTypes.Name, user.Login),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Role, user.ProfileId)
                    }),
                    Expires = DateTime.UtcNow.AddHours(_configuration.GetValue<int>("TokenDuration")),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
        }

         public void ChangeUserPassword(string login, string currentPassword, string newPassword){
             var _currentUser = _clinioContext.Users.FirstOrDefault(u=>u.Login.Equals(login));
             if(_currentUser is null)
                 throw new UserInvalidException();
             if(Security.PasswordVerified(_currentUser,currentPassword)){
                 _currentUser.Password = Security.HashPassword(_currentUser,newPassword);
             }else{
                 throw new PasswordInvalidException();
             }
              
            _clinioContext.SaveChanges();
        }
    }
}