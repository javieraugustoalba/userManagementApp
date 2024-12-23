using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserManagementBackend.Models;
using BCrypt.Net;

namespace UserManagementBackend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IOptions<DatabaseSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _users = database.GetCollection<User>("users");
        }

        public async Task<List<User>> GetAsync() => await _users.Find(_ => true).ToListAsync();

        public async Task<User> GetAsync(string id) => await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _users.InsertOneAsync(user);
        }

        public async Task UpdateAsync(string id, User user) =>
            await _users.ReplaceOneAsync(u => u.Id == id, user);

        public async Task DeleteAsync(string id) =>
            await _users.DeleteOneAsync(u => u.Id == id);
    }
}
