using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Create(Schedule newSchedule)
        {
            await _scheduleService.CreateAsync(newSchedule);
            return CreatedAtAction(nameof(Get), new { id = newSchedule.Id }, newSchedule);
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
