using clinioapi.core.Entities;
using clinioapi.services;
using clinioapi.webapi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceController: ControllerBase
    {
        private readonly  ClinicService _clinicService ;

        public ServiceController(ClinicService clinicService)
        {
            _clinicService=clinicService;
        }

       [HttpPost("RegisterProcedure")]
       public IActionResult RegisterProcedure(NewProcedureViewModel model){
           try{
               _clinicService.RegisterProcedure(model.PatientId,model.ToothId, model.AppointmentId,model.ProcedureId,model.Comments);
               return Ok();

           }catch{
                 return BadRequest();
             }
       }
    }
}