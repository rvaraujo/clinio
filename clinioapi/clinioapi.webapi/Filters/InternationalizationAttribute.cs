using System.Globalization;
using System.Threading;
using Microsoft.AspNetCore.Mvc.Filters;

namespace clinioapi.webapi.Filters
{
    public class InternationalizationAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var cultureInfo = CultureInfo.GetCultureInfo("en-NZ");

        Thread.CurrentThread.CurrentCulture = cultureInfo;
        Thread.CurrentThread.CurrentUICulture = cultureInfo;
        
    }
    }
}