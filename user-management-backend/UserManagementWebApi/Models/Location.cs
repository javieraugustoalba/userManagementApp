using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using UserManagementWebApi.Enums;

namespace UserManagementBackend.Models
{
    public class Location
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null;

        public string Name { get; set; }
        public string Address { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LocationStatus  Status { get; set; } 
        public List<Schedule> AccessSchedules { get; set; }
    }

}
