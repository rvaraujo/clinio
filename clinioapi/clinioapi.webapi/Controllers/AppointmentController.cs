using System;
using System.Threading.Tasks;
using clinioapi.services;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentController: ControllerBase
    {
        private readonly AppointmentService _appointmentService;
        public AppointmentController(AppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("{dentistId}/{date}")]
        public async Task<IActionResult> GetAppointments(string dentistId, DateTime date){
            try{
                return Ok(await _appointmentService.Get(dentistId,date));

            }catch{
                 return BadRequest();
             }
        }
        
    }
}