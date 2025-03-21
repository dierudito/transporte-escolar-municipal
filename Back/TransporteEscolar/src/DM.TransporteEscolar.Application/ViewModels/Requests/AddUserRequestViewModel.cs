using DM.TransporteEscolar.Application.Enums;

namespace DM.TransporteEscolar.Application.ViewModels.Requests;
public record AddUserRequestViewModel(
    string Name,
    string Email,
    string Password,
    UserTypeViewModel UserType,
    string? Phone,
    string? Address);