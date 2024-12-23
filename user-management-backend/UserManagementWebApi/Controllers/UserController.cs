using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserManagementBackend.Models;
using UserManagementBackend.Services;

namespace UserManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService) => _userService = userService;

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get() => await _userService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Post(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Id))
            {
                user.Id = ObjectId.GenerateNewId().ToString();
            }
            
            await _userService.CreateAsync(user);
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _userService.GetAsync(id);
            if (user == null) return NotFound();

            await _userService.UpdateAsync(id, updatedUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userService.GetAsync(id);
            if (user == null) return NotFound();

            await _userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
