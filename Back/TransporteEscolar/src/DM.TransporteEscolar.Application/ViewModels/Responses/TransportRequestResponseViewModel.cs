using DM.TransporteEscolar.Application.Enums;

namespace DM.TransporteEscolar.Application.ViewModels.Responses;

public record TransportRequestResponseViewModel(
    Guid Id,
    string? AdditionalInfo,
    Guid StudentId,
    Guid SchoolId,
    StatusRequestViewModel Status);
