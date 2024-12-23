using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserManagementBackend.Models
{
    public class Schedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null;

        public string UserId { get; set; }
        public string LocationId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
