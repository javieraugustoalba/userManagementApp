using MongoDB.Driver;
using UserManagementBackend.Models;
using BCrypt.Net;
using Microsoft.Extensions.Options;

namespace UserManagementBackend.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<User> _users;

        public AuthService(IOptions<DatabaseSettings> dbSettings)
        {
            var client = new MongoClient(dbSettings.Value.ConnectionString);
            var database = client.GetDatabase(dbSettings.Value.DatabaseName);
            _users = database.GetCollection<User>("users");
        }

        public async Task<User> AuthenticateUserAsync(string email, string password)
        {
            var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null; 
            }

            return user;
        }
    }
}
