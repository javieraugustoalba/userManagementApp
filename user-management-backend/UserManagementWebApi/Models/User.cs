using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using UserManagementWebApi.Enums;

namespace UserManagementBackend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
        public string LastName { get; set; }

        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Password { get; set; } 

        [BsonRepresentation(BsonType.String)] 
        public UserType UserType { get; set; }
    }
}
