using MongoDB.Driver;
using Microsoft.Extensions.Options;
using UserManagementBackend.Models;

namespace UserManagementBackend.Database
{
    public class DatabaseInitializer
    {
        private readonly IMongoDatabase _database;

        public DatabaseInitializer(IMongoClient mongoClient, IOptions<DatabaseSettings> settings)
        {
            _database = mongoClient.GetDatabase(settings.Value.DatabaseName);
        }

        public void Initialize()
        {
            // Ensure collections exist
            CreateCollectionIfNotExists("users");
            CreateCollectionIfNotExists("locations");
            CreateCollectionIfNotExists("schedules");

            // Seed data if necessary
        }

        private void CreateCollectionIfNotExists(string collectionName)
        {
            var collections = _database.ListCollectionNames().ToList();
            if (!collections.Contains(collectionName))
            {
                _database.CreateCollection(collectionName);
            }
        }
    }
}
