namespace DM.TransporteEscolar.Application.ViewModels.Requests;

public record UpdateSchoolRequestViewModel(
    string Name,
    string Address,
    string ZipCode,
    string Phone);
