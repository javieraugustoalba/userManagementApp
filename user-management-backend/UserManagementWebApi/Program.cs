using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserManagementBackend.Database;
using UserManagementBackend.Models;
using UserManagementBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<DatabaseSettings>>().Value;

    if (string.IsNullOrEmpty(settings.ConnectionString))
    {
        throw new Exception("MongoDB ConnectionString is missing or invalid.");
    }

    return new MongoClient(settings.ConnectionString);
});
builder.Services.AddSingleton<DatabaseInitializer>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<LocationService>();
builder.Services.AddSingleton<AuthService>();
builder.Services.AddSingleton<ScheduleService>();
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

var app = builder.Build();

var initializer = app.Services.GetRequiredService<DatabaseInitializer>();
initializer.Initialize();
AdminUserInitializer.Initialize("mongodb://localhost:27017");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowAll");
app.Run();