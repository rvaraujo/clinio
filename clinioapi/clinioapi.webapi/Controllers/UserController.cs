using System;
using System.Security.Authentication;
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
    public class UserController: BaseController
    {
        private readonly  UserService _userService ;

        public UserController(UserService userService, IMapper mapper) : base(mapper)
        {
            _userService = userService;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult CreateUser(UserViewModel model){
            try{
                _userService.SaveUser(_mapper.Map<User>(model));
                return Ok();
            }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
        }

        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult EditUser(UserViewModel model){
            try{
                _userService.SaveUser(_mapper.Map<User>(model));
                return Ok();
            }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
        }

        [HttpPatch]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
         [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult ChangeUserPassword(ChangePasswordViewModel model){
            try{
                _userService.ChangeUserPassword(model.Login, model.CurrentPassword, model.NewPassword);
                return Ok();
            }catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
        }

        [HttpPost("Authenticate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        public IActionResult Authenticate(LoginViewModel model){
            try
            {
                return Ok(_userService.Authenticate(model.Login, model.Password));
                
            }catch(AuthenticationException authException){
                return Unauthorized(GenerateErrorInfo(authException));
            }
            catch(Exception exception){
                 return BadRequest(GenerateErrorInfo(exception));
             }
         }

        
        }
        
    }
