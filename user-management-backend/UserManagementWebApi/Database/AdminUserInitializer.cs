using MongoDB.Bson;
using MongoDB.Driver;

public class AdminUserInitializer
{
    public static void Initialize(string connectionString)
    {
        var client = new MongoClient(connectionString);
        var adminDatabase = client.GetDatabase("admin");

        var userExists = adminDatabase.RunCommand<BsonDocument>(new BsonDocument
        {
            { "usersInfo", "admin" }
        })["users"].AsBsonArray.Count > 0;

        if (!userExists)
        {
            adminDatabase.RunCommand<BsonDocument>(new BsonDocument
            {
                {
                    "createUser", "admin"
                },
                {
                    "pwd", "password123"
                },
                {
                    "roles", new BsonArray { new BsonDocument { { "role", "root" }, { "db", "admin" } } }
                }
            });

            Console.WriteLine("Admin user created successfully.");
        }
        else
        {
            Console.WriteLine("Admin user already exists.");
        }
    }
}
