﻿namespace DM.TransporteEscolar.bff.Extensions;

public static class ApiExtension
{
    public static void ConfigureDevEnvironment(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
}