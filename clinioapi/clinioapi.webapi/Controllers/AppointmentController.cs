using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using clinioapi.services;
using clinioapi.webapi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
     [Authorize]
    public class AppointmentController: BaseController
    {
        private readonly AppointmentService _appointmentService;
        public AppointmentController(AppointmentService appointmentService, IMapper mapper): base(mapper)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("{dentistId}/{date}")]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAppointments(string dentistId, DateTime date){
            try{
                return Ok(await _appointmentService.Get(dentistId,date));

            }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
        }
        
    }
}