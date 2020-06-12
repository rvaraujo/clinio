using clinioapi.infrastructure;

namespace clinioapi.services
{
    public class BaseService
    {
        internal readonly  ClinioContext _clinioContext ;

        public BaseService(ClinioContext clinioContext)
        {
            _clinioContext = clinioContext;
        }
    }
}