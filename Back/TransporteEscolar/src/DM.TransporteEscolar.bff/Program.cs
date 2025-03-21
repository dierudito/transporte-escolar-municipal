
using DM.TransporteEscolar.bff.Endpoints;
using DM.TransporteEscolar.bff.Extensions;
using DM.TransporteEscolar.Infra.CrossCutting.Shared.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.AddConfiguration();
builder.Services.RegisterServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.ConfigureDevEnvironment();

app.UseCors(ApiConfigurations.CorsPolicyName);
app.MapEndpoints();

app.Run();