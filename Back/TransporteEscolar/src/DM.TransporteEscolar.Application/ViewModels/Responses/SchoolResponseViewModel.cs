namespace DM.TransporteEscolar.Application.ViewModels.Responses;

public record SchoolResponseViewModel(
    Guid Id,
    string Name,
    string Address,
    string ZipCode,
    string Phone);
