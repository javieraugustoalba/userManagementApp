using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserManagementBackend.Models;
using UserManagementBackend.Services;
using UserManagementWebApi.Enums;

namespace UserManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly LocationService _locationService;

        public LocationController(LocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Location>>> Get() =>
            await _locationService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> Get(string id)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Location newLocation)
        {
            if (!string.IsNullOrEmpty(newLocation.Id) && !ObjectId.TryParse(newLocation.Id, out _))
            {
                return BadRequest("Invalid Id format. Id must be a valid 24-character hexadecimal string.");
            }

            newLocation.Id = null; 
            await _locationService.CreateAsync(newLocation);
            return CreatedAtAction(nameof(Get), new { id = newLocation.Id }, newLocation);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] Location updatedStatusModel)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null) return NotFound();

            location.Status = updatedStatusModel.Status; 
            await _locationService.UpdateAsync(id, location);
            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Location updatedLocation)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            updatedLocation.Id = location.Id; 
            await _locationService.UpdateAsync(id, updatedLocation);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            await _locationService.RemoveAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/schedule")]
        public async Task<IActionResult> AddAccessSchedule(string id, Schedule schedule)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            await _locationService.AddAccessScheduleAsync(id, schedule);
            return NoContent();
        }

        [HttpDelete("{id}/schedule/{userId}")]
        public async Task<IActionResult> RemoveAccessSchedule(string id, string userId)
        {
            var location = await _locationService.GetAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            await _locationService.RemoveAccessScheduleAsync(id, userId);
            return NoContent();
        }
    }
}
