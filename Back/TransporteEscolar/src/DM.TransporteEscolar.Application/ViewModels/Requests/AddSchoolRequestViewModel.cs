namespace DM.TransporteEscolar.Application.ViewModels.Requests;

public record AddSchoolRequestViewModel(
    string Name,
    string Address,
    string ZipCode,
    string Phone);
