using EE.API.Data;
using EE.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

const string allowAllOrigins = "ALLOW_ALL_ORIGINS";
builder.Services.AddCors(options =>
{
    options.AddPolicy(allowAllOrigins,
        policy => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
});


builder.Services.AddOptions();

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

var app = builder.Build();

app.MapIdentityApi<AppUser>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();