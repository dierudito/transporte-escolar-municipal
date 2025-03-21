using AutoMapper;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;

namespace DM.TransporteEscolar.Application.AutoMapper;

public class SchoolMap : Profile
{
    public SchoolMap()
    {
        CreateMap<AddSchoolRequestViewModel, School>();
        CreateMap<School, SchoolResponseViewModel>();
    }
}
