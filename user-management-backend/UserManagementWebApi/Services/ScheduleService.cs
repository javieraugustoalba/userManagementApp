using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserManagementBackend.Models;

namespace UserManagementBackend.Services
{
    public class ScheduleService
    {
        private readonly IMongoCollection<Schedule> _schedules;

        public ScheduleService(IOptions<DatabaseSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _schedules = database.GetCollection<Schedule>("schedules");
        }

        public async Task<List<Schedule>> GetAsync() =>
            await _schedules.Find(schedule => true).ToListAsync();

        public async Task<Schedule> GetAsync(string id) =>
            await _schedules.Find(schedule => schedule.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Schedule schedule) =>
            await _schedules.InsertOneAsync(schedule);

        public async Task UpdateAsync(string id, Schedule updatedSchedule) =>
            await _schedules.ReplaceOneAsync(schedule => schedule.Id == id, updatedSchedule);

        public async Task RemoveAsync(string id) =>
            await _schedules.DeleteOneAsync(schedule => schedule.Id == id);
    }
}
