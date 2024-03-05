using EE.API.Data;
using EE.API.Hubs;
using EE.API.Models;
using EE.API.Services.Contracts;
using EE.API.Services.Implementations;
using Hangfire;
using Hangfire.Storage.SQLite;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

const string allowAllOrigins = "ALLOW_ALL_ORIGINS";
builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllOrigins,
        policy => policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddOptions();
builder.Services.AddSignalR();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped(typeof(IContentService<>), typeof(ContentService<>));
builder.Services.AddSingleton(Log.Logger);
builder.Services.AddSingleton<UserConnectionsDb>();
builder.Services.AddScoped<NotificationHub>();

// hangfire config
var hangFireConnectionString = builder.Configuration.GetConnectionString("Hangfire");
builder.Services.AddHangfire(config => config
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseSQLiteStorage(hangFireConnectionString));

// hangfire server
builder.Services.AddHangfireServer();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();
builder.Services.AddDbContext<ApplicationDbContext>(options => { options.UseSqlite("DataSource=ee_database.db"); });
builder.Services.AddIdentityCore<AppUser>().AddEntityFrameworkStores<ApplicationDbContext>().AddApiEndpoints();
builder.Services.AddControllers();
builder.Host.UseSerilog((context, configuration) =>
    configuration.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader().AllowCredentials();
});

app.UseSerilogRequestLogging();
app.MapHub<NotificationHub>("/notifications");
app.MapIdentityApi<AppUser>();
app.MapControllers();

app.UseHangfireDashboard();
app.MapHangfireDashboard("/hangfire", new DashboardOptions()
{
    DashboardTitle = "Ethereal Emporium Services"
});

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.Run();