using AutoMapper;
using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using System.Net;

namespace DM.TransporteEscolar.Application.AppServices;
public class TransportRequestAppService(IMapper mapper, ITransportRequestService service, ITransportRequestRepository repository)
    : ITransportRequestAppService
{
    public async Task<Response<TransportRequestResponseViewModel>> AddAsync(AddTransportRequestRequestViewModel transportrequest)
    {
        var entity = mapper.Map<TransportRequest>(transportrequest);

        try
        {
            if (entity is null)
            {
                return new Response<TransportRequestResponseViewModel>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados da solicitação de transporte"
                };
            }
            var result = await service.AddAsync(entity);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<TransportRequestResponseViewModel>
                {
                    Data = mapper.Map<TransportRequestResponseViewModel>(entity),
                    Message = "Solicitação de transporte cadastrada com sucesso"
                };
            }

            return new Response<TransportRequestResponseViewModel>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao cadastrar solicitação de transporte"
            };
        }
        catch (Exception e)
        {
            return new Response<TransportRequestResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<bool>> DeleteAsync(Guid id)
    {
        try
        {
            if (!await repository.AreThereAsync(transportrequest => transportrequest.Id == id))
                return new Response<bool>
                {
                    Message = "Solicitação de transporte excluída com sucesso"
                };

            await service.DeleteAsync(id);
            await repository.SaveChangesAsync();

            return new Response<bool>
            {
                Message = "Solicitação de transporte excluída com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<bool>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<bool>> UpdateAsync(UpdateTransportRequestRequestViewModel transportrequest, Guid id)
    {
        var entity = mapper.Map<TransportRequest>(transportrequest);

        try
        {
            if (entity is null)
            {
                return new Response<bool>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados da solicitação de transporte"
                };
            }

            var result = await service.UpdateAsync(entity, id);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<bool>
                {
                    Message = "Solicitação de transporte atualizada com sucesso"
                };
            }

            return new Response<bool>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao atualizar solicitação de transporte"
            };
        }
        catch (Exception e)
        {
            return new Response<bool>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<List<TransportRequestResponseViewModel>>> GetAllAsync()
    {
        try
        {
            var transportrequests = await repository.GetAllAsync();
            return new Response<List<TransportRequestResponseViewModel>>
            {
                Data = mapper.Map<List<TransportRequestResponseViewModel>>(transportrequests),
                Message = "Solicitações de transportes listadas com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<List<TransportRequestResponseViewModel>>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<TransportRequestResponseViewModel>> GetByIdAsync(Guid id)
    {
        try
        {
            var transportrequest = await repository.GetByIdAsync(id);
            if (transportrequest is null)
            {
                return new Response<TransportRequestResponseViewModel>
                {
                    Code = HttpStatusCode.NotFound,
                    Message = "Solicitação de transporte não encontrada"
                };
            }

            return new Response<TransportRequestResponseViewModel>
            {
                Data = mapper.Map<TransportRequestResponseViewModel>(transportrequest),
                Message = "Solicitação de transporte encontrada com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<TransportRequestResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }
}
