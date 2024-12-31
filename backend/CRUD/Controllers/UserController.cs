using CRUD.DTO;
using CRUD.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpGet]
        public async Task<IActionResult> getUsers()
        {
            try
            {
                var response = await _userService.GetUsers();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> getUserByUsername([FromRoute] string username)
        {
            try
            {
                var response = await _userService.GetUserByUsername(username);
                if(response != null)
                {
                    return Ok(response);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("/login/{username}/{password}")]
        public async Task<IActionResult> Login(string username, string password)
        {
            try
            {
                var token = await _authService.Login(username, password);
                if(string.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { message = "Unauthorized: username or password is incorrect"});
                }
                return Ok( new {Token = token});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> postUser(UserDTO request)
        {
            try
            {
                await _userService.PostUser(request);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{username}")]
        public async Task<IActionResult> deleteUser([FromRoute] string username)
        {
            try
            {
                await _userService.DeleteUser(username);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
