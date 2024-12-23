using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserManagementBackend.Models;
using UserManagementWebApi.Enums;

namespace UserManagementBackend.Services
{
    public class LocationService
    {
        private readonly IMongoCollection<Location> _locations;

        public LocationService(IOptions<DatabaseSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _locations = database.GetCollection<Location>("locations");
        }

        public async Task<List<Location>> GetAsync() =>
            await _locations.Find(location => true).ToListAsync();

        public async Task<Location> GetAsync(string id) =>
            await _locations.Find(location => location.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Location location) =>
            await _locations.InsertOneAsync(location);

        public async Task UpdateAsync(string id, Location updatedLocation) =>
            await _locations.ReplaceOneAsync(location => location.Id == id, updatedLocation);

        public async Task RemoveAsync(string id) =>
            await _locations.DeleteOneAsync(location => location.Id == id);

        public async Task UpdateStatusAsync(string id, LocationStatus status) =>
            await _locations.UpdateOneAsync(
                location => location.Id == id,
                Builders<Location>.Update.Set(l => l.Status, status));

        public async Task AddAccessScheduleAsync(string id, Schedule schedule) =>
            await _locations.UpdateOneAsync(
                location => location.Id == id,
                Builders<Location>.Update.Push(l => l.AccessSchedules, schedule));

        public async Task RemoveAccessScheduleAsync(string id, string userId) =>
            await _locations.UpdateOneAsync(
                location => location.Id == id,
                Builders<Location>.Update.PullFilter(l => l.AccessSchedules, s => s.UserId == userId));
    }
}
