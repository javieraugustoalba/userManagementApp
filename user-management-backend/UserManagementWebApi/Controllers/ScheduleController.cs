using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using UserManagementBackend.Models;
using UserManagementBackend.Services;

namespace UserManagementBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleService _scheduleService;

        public ScheduleController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Schedule>>> Get() =>
            await _scheduleService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> Get(string id)
        {
            var schedule = await _scheduleService.GetAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Schedule schedule)
        {
            if (string.IsNullOrWhiteSpace(schedule.UserId) || schedule.UserId == "Select a User")
            {
                return BadRequest(new { Message = "Invalid User: Please select a valid user." });
            }

            if (string.IsNullOrWhiteSpace(schedule.LocationId) || schedule.LocationId == "Select a Location")
            {
                return BadRequest(new { Message = "Invalid Location: Please select a valid location." });
            }

            if (string.IsNullOrWhiteSpace(schedule.Id))
            {
                schedule.Id = ObjectId.GenerateNewId().ToString();
            }

            await _scheduleService.CreateAsync(schedule);
            return CreatedAtAction(nameof(Get), new { id = schedule.Id }, schedule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Schedule updatedSchedule)
        {
            var schedule = await _scheduleService.GetAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            updatedSchedule.Id = schedule.Id; // Keep the same ID
            await _scheduleService.UpdateAsync(id, updatedSchedule);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var schedule = await _scheduleService.GetAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            await _scheduleService.RemoveAsync(id);
            return NoContent();
        }
    }
}
