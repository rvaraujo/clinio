using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using clinioapi.core.Entities;
using clinioapi.services;
using clinioapi.webapi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatientController: ControllerBase
    {
        private readonly  PatientService _patientService ;
        private readonly IMapper _mapper;

        public PatientController(PatientService patientService,IMapper mapper)
        {
            _patientService = patientService;
            _mapper = mapper;
        }

         [HttpGet]
         public async Task<IActionResult> GetPatients(){

             try{
                 return Ok(await _patientService.GetAll());

             }catch{
                 return BadRequest();
             }
         }

         [HttpPut]
         public  IActionResult EditPatient(PatientViewModel model){
               try{
                   Thread.Sleep(new TimeSpan(0,0,2));
                    _patientService.SavePatient(_mapper.Map<Patient>(model));
                    return Ok();

             }catch{
                 return BadRequest();
             }
         }

         [HttpPost]
         public  IActionResult CreatePatient(PatientViewModel model){
               try{
                   Thread.Sleep(new TimeSpan(0,0,2));
                    _patientService.SavePatient(_mapper.Map<Patient>(model));
                    return Ok();

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