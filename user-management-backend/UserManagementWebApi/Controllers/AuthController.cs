using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserManagementBackend.Models;

namespace UserManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public AuthController(IOptions<DatabaseSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _users = database.GetCollection<User>("Users");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, hashedPassword))
            {
                return Unauthorized("Invalid email or password");
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
