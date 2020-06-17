using System;
using System.Threading.Tasks;
using AutoMapper;
using clinioapi.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ParametersController: BaseController
    {
         private readonly  ParametersService _parametersService;

         public ParametersController(ParametersService parametersService, IMapper mapper): base(mapper)
         {
             _parametersService = parametersService;
         }

         [HttpGet("GetGenders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetGenders(){
             try{
                 return Ok(await _parametersService.getGenders());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpGet("GetInsurances")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetInsurances(){
             try{
                 return Ok(await _parametersService.getInsurances());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpGet("GetTooths")]
           [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetTooths(){
             try{
                 return Ok(await _parametersService.getTooths());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

        [HttpGet("GetProfiles")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetProfiles(){
             try{
                 return Ok(await _parametersService.getProfiles());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

        [HttpGet("GetProcedures")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetProcedures(){
             try{
                 return Ok(await _parametersService.getProcedures());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

         [HttpGet("GetCid10Catalog")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
         public async Task<IActionResult> GetCid10Catalog(){
             try{
                 return Ok(await _parametersService.getCid10Catalog());
             }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }
    }
}