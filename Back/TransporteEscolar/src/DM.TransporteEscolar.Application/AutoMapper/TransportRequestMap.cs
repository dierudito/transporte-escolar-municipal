using AutoMapper;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;

namespace DM.TransporteEscolar.Application.AutoMapper;

public class TransportRequestMap : Profile
{
    public TransportRequestMap()
    {
        CreateMap<AddTransportRequestRequestViewModel, TransportRequest>();
        CreateMap<TransportRequest, TransportRequestResponseViewModel>();
    }
}
