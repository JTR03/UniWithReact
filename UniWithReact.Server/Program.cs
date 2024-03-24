using Microsoft.EntityFrameworkCore;
using UniWithReact.Server.Data;
using UniWithReact.Server.Routes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UniContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("UniContext") ?? throw new InvalidOperationException("UniContes is not found")
));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapFallbackToFile("/index.html");

StudentEndpoint.Map(app);

app.Run();


