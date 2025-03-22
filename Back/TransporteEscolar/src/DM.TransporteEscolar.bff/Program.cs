
using DM.TransporteEscolar.bff.Endpoints;
using DM.TransporteEscolar.bff.Extensions;
using DM.TransporteEscolar.Infra.CrossCutting.Shared;
using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.AddConfiguration();
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.RegisterServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.ConfigureDevEnvironment();

app.UseCors(ApiConfigurations.CorsPolicyName);
app.MapEndpoints();

app.Run();