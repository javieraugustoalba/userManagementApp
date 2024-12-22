using MongoDB.Driver;
using MongoDB.Bson;
using UserManagementBackend.Models;
using UserManagementWebApi.Enums;
using Microsoft.Extensions.Options;

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

            // Seed data
            SeedUsers();
            SeedLocations();
            SeedSchedules();
        }

        private void CreateCollectionIfNotExists(string collectionName)
        {
            var collections = _database.ListCollectionNames().ToList();
            if (!collections.Contains(collectionName))
            {
                _database.CreateCollection(collectionName);
            }
        }

        private void SeedUsers()
        {
            var usersCollection = _database.GetCollection<User>("users");

            if (!usersCollection.AsQueryable().Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        FirstName = "Admin",
                        LastName = "User",
                        Address = "123 Admin St",
                        PhoneNumber = "555-1234",
                        Email = "admin@example.com",
                        Country = "USA",
                        City = "New York",
                        Password = BCrypt.Net.BCrypt.HashPassword("adminpassword"),
                        UserType = UserType.Administrator
                    },
                    new User
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        FirstName = "John",
                        LastName = "Doe",
                        Address = "456 Elm St",
                        PhoneNumber = "555-5678",
                        Email = "john.doe@example.com",
                        Country = "USA",
                        City = "Los Angeles",
                        Password = BCrypt.Net.BCrypt.HashPassword("johndoe123"),
                        UserType = UserType.Employee
                    },
                    new User
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        FirstName = "Jane",
                        LastName = "Smith",
                        Address = "789 Oak St",
                        PhoneNumber = "555-9101",
                        Email = "jane.smith@example.com",
                        Country = "USA",
                        City = "Chicago",
                        Password = BCrypt.Net.BCrypt.HashPassword("janesmith123"),
                        UserType = UserType.Employee
                    },
                    new User
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        FirstName = "Robert",
                        LastName = "Brown",
                        Address = "101 Pine St",
                        PhoneNumber = "555-1122",
                        Email = "robert.brown@example.com",
                        Country = "USA",
                        City = "San Francisco",
                        Password = BCrypt.Net.BCrypt.HashPassword("robertbrown123"),
                        UserType = UserType.Employee
                    },
                    new User
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        FirstName = "Emily",
                        LastName = "White",
                        Address = "202 Maple St",
                        PhoneNumber = "555-3344",
                        Email = "emily.white@example.com",
                        Country = "USA",
                        City = "Seattle",
                        Password = BCrypt.Net.BCrypt.HashPassword("emilywhite123"),
                        UserType = UserType.Employee
                    }
                };

                usersCollection.InsertMany(users);
            }
        }

        private void SeedLocations()
        {
            var locationsCollection = _database.GetCollection<Location>("locations");

            if (!locationsCollection.AsQueryable().Any())
            {
                var locations = new List<Location>
                {
                    new Location
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Name = "Head Office",
                        Address = "123 Corporate Blvd",
                        Status = LocationStatus.Active,
                        AccessSchedules = new List<Schedule>()
                    },
                    new Location
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Name = "Branch Office 1",
                        Address = "456 Branch St",
                        Status = LocationStatus.Inactive,
                        AccessSchedules = new List<Schedule>()
                    },
                    new Location
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Name = "Branch Office 2",
                        Address = "789 Suburb Ave",
                        Status = LocationStatus.Active,
                        AccessSchedules = new List<Schedule>()
                    },
                    new Location
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Name = "Warehouse",
                        Address = "101 Industrial Rd",
                        Status = LocationStatus.Inactive,
                        AccessSchedules = new List<Schedule>()
                    },
                    new Location
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        Name = "Remote Office",
                        Address = "202 Remote Ln",
                        Status = LocationStatus.Active,
                        AccessSchedules = new List<Schedule>()
                    }
                };

                locationsCollection.InsertMany(locations);
            }
        }

        private void SeedSchedules()
        {
            var schedulesCollection = _database.GetCollection<Schedule>("schedules");
            var usersCollection = _database.GetCollection<User>("users");
            var locationsCollection = _database.GetCollection<Location>("locations");

            if (!schedulesCollection.AsQueryable().Any())
            {
                var users = usersCollection.Find(FilterDefinition<User>.Empty).ToList();
                var locations = locationsCollection.Find(FilterDefinition<Location>.Empty).ToList();

                var schedules = new List<Schedule>
                {
                    new Schedule
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = users[1].Id,
                        LocationId = locations[0].Id,
                        StartTime = DateTime.UtcNow,
                        EndTime = DateTime.UtcNow.AddHours(8)
                    },
                    new Schedule
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = users[2].Id,
                        LocationId = locations[1].Id,
                        StartTime = DateTime.UtcNow,
                        EndTime = DateTime.UtcNow.AddHours(6)
                    },
                    new Schedule
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = users[3].Id,
                        LocationId = locations[2].Id,
                        StartTime = DateTime.UtcNow,
                        EndTime = DateTime.UtcNow.AddHours(4)
                    },
                    new Schedule
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = users[4].Id,
                        LocationId = locations[3].Id,
                        StartTime = DateTime.UtcNow,
                        EndTime = DateTime.UtcNow.AddHours(5)
                    },
                    new Schedule
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        UserId = users[0].Id,
                        LocationId = locations[4].Id,
                        StartTime = DateTime.UtcNow,
                        EndTime = DateTime.UtcNow.AddHours(7)
                    }
                };

                schedulesCollection.InsertMany(schedules);
            }
        }
    }
}
