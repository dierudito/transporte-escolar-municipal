using AutoMapper;
using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using System.Net;

namespace DM.TransporteEscolar.Application.AppServices;
public class SchoolAppService(IMapper mapper, ISchoolService service, ISchoolRepository repository)
    : ISchoolAppService
{
    public async Task<Response<SchoolResponseViewModel>> AddAsync(AddSchoolRequestViewModel school)
    {
        var entity = mapper.Map<School>(school);

        try
        {
            if (entity is null)
            {
                return new Response<SchoolResponseViewModel>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados da escola"
                };
            }
            var result = await service.AddAsync(entity);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<SchoolResponseViewModel>
                {
                    Data = mapper.Map<SchoolResponseViewModel>(entity),
                    Message = "Escola cadastrada com sucesso"
                };
            }

            return new Response<SchoolResponseViewModel>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao cadastrar escola"
            };
        }
        catch (Exception e)
        {
            return new Response<SchoolResponseViewModel>
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
            if (!await repository.AreThereAsync(school => school.Id == id))
                return new Response<bool>
                {
                    Message = "Escola excluída com sucesso"
                };

            await service.DeleteAsync(id);
            await repository.SaveChangesAsync();

            return new Response<bool>
            {
                Message = "Escola excluída com sucesso"
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

    public async Task<Response<bool>> UpdateAsync(UpdateSchoolRequestViewModel school, Guid id)
    {
        var entity = mapper.Map<School>(school);

        try
        {
            if (entity is null)
            {
                return new Response<bool>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados da escola"
                };
            }

            var result = await service.UpdateAsync(entity, id);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<bool>
                {
                    Message = "Escola atualizada com sucesso"
                };
            }

            return new Response<bool>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao atualizar escola"
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

    public async Task<Response<List<SchoolResponseViewModel>>> GetAllAsync()
    {
        try
        {
            var schools = await repository.GetAllAsync();
            return new Response<List<SchoolResponseViewModel>>
            {
                Data = mapper.Map<List<SchoolResponseViewModel>>(schools),
                Message = "Escolas listadas com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<List<SchoolResponseViewModel>>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<SchoolResponseViewModel>> GetByIdAsync(Guid id)
    {
        try
        {
            var school = await repository.GetByIdAsync(id);
            if (school is null)
            {
                return new Response<SchoolResponseViewModel>
                {
                    Code = HttpStatusCode.NotFound,
                    Message = "Escola não encontrada"
                };
            }

            return new Response<SchoolResponseViewModel>
            {
                Data = mapper.Map<SchoolResponseViewModel>(school),
                Message = "Escola encontrada com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<SchoolResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }
}
