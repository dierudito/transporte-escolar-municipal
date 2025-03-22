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
        
        CreateMap<TransportRequest, TransportRequestDetailResponseViewModel>()
            .ForMember(dest => dest.StatusRequest, opt => opt.MapFrom(src => src.Status.ToString()))
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Name))
            .ForMember(dest => dest.SchoolName, opt => opt.MapFrom(src => src.School.Name))
            .ForMember(dest => dest.RequestDate, opt => opt.MapFrom(src => src.Date));
    }
}
