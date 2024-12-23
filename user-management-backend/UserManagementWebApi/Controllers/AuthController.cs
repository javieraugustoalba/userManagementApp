using Microsoft.AspNetCore.Mvc;
using UserManagementBackend.Services;
using UserManagementBackend.Models;

namespace UserManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _authService.AuthenticateUserAsync(request.Email, request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Address,
                user.PhoneNumber,
                user.Email,
                user.Country,
                user.City,
                user.UserType
            });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
