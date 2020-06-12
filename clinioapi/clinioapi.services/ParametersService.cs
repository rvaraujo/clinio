using System.Collections.Generic;
using System.Threading.Tasks;
using clinioapi.infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace clinioapi.services
{
    public class ParametersService: BaseService
    {
         public ParametersService(ClinioContext clinioContext) : base(clinioContext){}

         public async Task<IList<KeyValuePair<string,string>>> getGenders(){
            return await _clinioContext.Genders.OrderBy(g=>g.Description).Select(g=>new KeyValuePair<string, string>(g.Id, g.Description)).ToListAsync();
         }

         public async Task<IList<KeyValuePair<string,string>>> getInsurances(){
            return await _clinioContext.Insurances.OrderBy(i=>i.Description).Select(i=>new KeyValuePair<string, string>(i.Id, i.Description)).ToListAsync();
         }

         public async Task<IList<KeyValuePair<int,string>>> getTooths(){
            return await _clinioContext.Tooths.OrderBy(t=>t.Id).Select(t=>new KeyValuePair<int, string>(t.Id, t.Description)).ToListAsync();
         }
    }
}