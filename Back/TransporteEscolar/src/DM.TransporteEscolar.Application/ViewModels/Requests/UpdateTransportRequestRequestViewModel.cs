namespace DM.TransporteEscolar.Application.ViewModels.Requests;

public record UpdateTransportRequestRequestViewModel(
    string AdditionalInfo,
    Guid StudentId,
    Guid SchoolId);
