using DM.TransporteEscolar.Application.Enums;

namespace DM.TransporteEscolar.Application.ViewModels.Responses;
public record UserResponseViewModel(
    Guid Id,
    string Name,
    string Email,
    string Password,
    UserTypeViewModel UserType,
    string? Phone,
    string? Address);