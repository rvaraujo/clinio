using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace clinioapi.webapi.Controllers
{
     [ApiController]
    [Route("[controller]")]
    public class BaseController:ControllerBase
    {
         internal readonly IMapper _mapper;

         public BaseController(IMapper mapper)
         {
             _mapper = mapper;
         }
         
         internal dynamic GenerateErrorInfo(Exception error){
             return new{Error=error.Message, Details=error.InnerException== null?string.Empty:error.InnerException.Message};
         }
    }
}