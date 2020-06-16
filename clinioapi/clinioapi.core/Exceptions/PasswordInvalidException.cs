using System;

namespace clinioapi.core.Exceptions
{
    public class PasswordInvalidException: Exception
    {
        public PasswordInvalidException()
        : base("Senha do usuário incorreta."){}

        public PasswordInvalidException(string message)
        : base(message){}

        public PasswordInvalidException(string message, Exception inner)
        : base(message, inner){}

         public PasswordInvalidException(Exception inner)
        : base("Senha do usuário incorreta.", inner){}
    }
}