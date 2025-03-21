using AutoMapper;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Application.AutoMapper;
public class UserMap : Profile
{
    public UserMap()
    {
        CreateMap<AddUserRequestViewModel, User>();
        CreateMap<User, UserResponseViewModel>();
    }
}