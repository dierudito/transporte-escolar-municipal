namespace DM.TransporteEscolar.Application.ViewModels.Requests;

public record UpdateStudentRequestViewModel(
    string Name,
    DateOnly BirthDate,
    string Address,
    string ZipCode,
    string? Cpf,
    Guid UserId);
