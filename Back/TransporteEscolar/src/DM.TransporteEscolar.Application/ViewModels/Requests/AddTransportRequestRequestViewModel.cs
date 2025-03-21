namespace DM.TransporteEscolar.Application.ViewModels.Requests;

public record AddTransportRequestRequestViewModel(
    string? AdditionalInfo,
    Guid StudentId,
    Guid SchoolId);
