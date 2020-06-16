using System;

namespace clinioapi.core.Exceptions
{
    public class UserInvalidException: Exception
    {
         public UserInvalidException()
        : base("Usuário inválido."){}

        public UserInvalidException(string message)
        : base(message){}

        public UserInvalidException(string message, Exception inner)
        : base(message, inner){}

         public UserInvalidException(Exception inner)
        : base("Usuário inválido.", inner){}
    }
}