using System.Threading.Tasks;
using clinioapi.services;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParametersController: ControllerBase
    {
         private readonly  ParametersService _parametersService;

         public ParametersController(ParametersService parametersService)
         {
             _parametersService = parametersService;
         }

         [HttpGet("GetGenders")]
         public async Task<IActionResult> GetGenders(){
             try{
                 return Ok(await _parametersService.getGenders());
             }catch{
                 return BadRequest();
             }
         }

         [HttpGet("GetInsurances")]
         public async Task<IActionResult> GetInsurances(){
             try{
                 return Ok(await _parametersService.getInsurances());
             }catch{
                 return BadRequest();
             }
         }

         [HttpGet("GetTooths")]
         public async Task<IActionResult> GetTooths(){
             try{
                 return Ok(await _parametersService.getTooths());
             }catch{
                 return BadRequest();
             }
         }
    }
}