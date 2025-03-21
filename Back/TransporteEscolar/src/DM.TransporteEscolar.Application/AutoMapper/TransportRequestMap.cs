using AutoMapper;
using DM.TransporteEscolar.Application.Enums;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Enums;

namespace DM.TransporteEscolar.Application.AutoMapper;

public class TransportRequestMap : Profile
{
    public TransportRequestMap()
    {
        CreateMap<AddTransportRequestRequestViewModel, TransportRequest>();
        CreateMap<UpdateTransportRequestRequestViewModel, TransportRequest>();
        CreateMap<TransportRequest, TransportRequestResponseViewModel>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (StatusRequestViewModel)src.Status));

        CreateMap<StatusRequest, StatusRequestViewModel>().ReverseMap();
    }
}
