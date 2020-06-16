using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
    public class PatientController:  BaseController
    {
        private readonly  PatientService _patientService ;

        public PatientController(PatientService patientService, IMapper mapper): base(mapper)
        {
            _patientService = patientService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetPatients(){

             try{
                 return Ok(await _patientService.GetAll());

             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpPut]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public  IActionResult EditPatient(PatientViewModel model){
               try{
                    _patientService.SavePatient(_mapper.Map<Patient>(model));
                    return Ok();

             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpPost]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public  IActionResult CreatePatient(PatientViewModel model){
               try{
                    _patientService.SavePatient(_mapper.Map<Patient>(model));
                    return Ok();

             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpGet("GetPatientRecord/{id}")]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public  async Task<IActionResult> GetPatientRecord(string id){
             try{
                 return Ok(await _patientService.GetPatientRecord(id));

             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpGet("{id}")]
         [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetPatient(string id){

             try{
                 return Ok(await _patientService.Get(id));

             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }
        
    }
}