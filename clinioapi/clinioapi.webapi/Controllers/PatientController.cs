using System.Linq;
using System.Threading.Tasks;
using clinioapi.services;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController: ControllerBase
    {
        private readonly  PatientService _patientService ;

        public PatientController(PatientService patientService)
        {
            _patientService = patientService;
        }

         [HttpGet]
         public async Task<IActionResult> GetPatients(){

             try{
                 return Ok(await _patientService.GetAll());

             }catch{
                 return BadRequest();
             }
         }

         [HttpGet("GetPatientRecord/{id}")]
         public  async Task<IActionResult> GetPatientRecord(string id){
             try{
                 return Ok(await _patientService.GetPatientRecord(id));

             }catch{
                 return BadRequest();
             }
         }

         [HttpGet("{id}")]
         public async Task<IActionResult> GetPatient(string id){

             try{
                 return Ok(await _patientService.Get(id));

             }catch{
                 return BadRequest();
             }
         }
        
    }
}