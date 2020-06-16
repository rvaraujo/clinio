using System;

namespace clinioapi.core.Exceptions
{
    public class AuthenticationException: Exception
    {
        public AuthenticationException()
        : base("Não foi possível validar o acesso ao sistema."){}

        public AuthenticationException(string message)
        : base(message){}

        public AuthenticationException(string message, Exception inner)
        : base(message, inner){}

         public AuthenticationException(Exception inner)
        : base("Não foi possível validar o acesso ao sistema.", inner){}
    }
}