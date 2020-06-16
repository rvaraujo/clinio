using System;
using AutoMapper;
using clinioapi.core.Entities;
using clinioapi.services;
using clinioapi.webapi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ServiceController: BaseController
    {
        private readonly  ClinicService _clinicService ;

        public ServiceController(ClinicService clinicService, IMapper mapper): base(mapper)
        {
            _clinicService=clinicService;
        }

        [HttpPost("RegisterProcedure")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult RegisterProcedure(NewProcedureViewModel model){
            try{
                _clinicService.RegisterProcedure(model.PatientId,model.ToothId, model.AppointmentId,model.ProcedureId,model.Comments);
                return Ok();

            }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
        }
    }
}