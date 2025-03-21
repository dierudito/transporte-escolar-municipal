namespace DM.TransporteEscolar.Application.ViewModels.Responses;

public record StudentResponseViewModel(
    Guid Id,
    string Name,
    DateOnly BirthDate,
    string Address,
    string ZipCode,
    string? Cpf,
    Guid UserId);
