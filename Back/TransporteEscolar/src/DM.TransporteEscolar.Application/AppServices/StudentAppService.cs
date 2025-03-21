using AutoMapper;
using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using System.Net;

namespace DM.TransporteEscolar.Application.AppServices;
public class StudentAppService(IMapper mapper, IStudentService service, IStudentRepository repository)
    : IStudentAppService
{
    public async Task<Response<StudentResponseViewModel>> AddAsync(AddStudentRequestViewModel student)
    {
        var entity = mapper.Map<Student>(student);

        try
        {
            if (entity is null)
            {
                return new Response<StudentResponseViewModel>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados do aluno"
                };
            }
            var result = await service.AddAsync(entity);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<StudentResponseViewModel>
                {
                    Data = mapper.Map<StudentResponseViewModel>(entity),
                    Message = "Aluno cadastrado com sucesso"
                };
            }

            return new Response<StudentResponseViewModel>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao cadastrar aluno"
            };
        }
        catch (Exception e)
        {
            return new Response<StudentResponseViewModel>
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
            if (!await repository.AreThereAsync(student => student.Id == id))
                return new Response<bool>
                {
                    Message = "Aluno excluído com sucesso"
                };

            await service.DeleteAsync(id);
            await repository.SaveChangesAsync();

            return new Response<bool>
            {
                Message = "Aluno excluído com sucesso"
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

    public async Task<Response<bool>> UpdateAsync(UpdateStudentRequestViewModel student, Guid id)
    {
        var entity = mapper.Map<Student>(student);

        try
        {
            if (entity is null)
            {
                return new Response<bool>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados do aluno"
                };
            }

            var result = await service.UpdateAsync(entity, id);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<bool>
                {
                    Message = "Aluno atualizado com sucesso"
                };
            }

            return new Response<bool>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao atualizar aluno"
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

    public async Task<Response<List<StudentResponseViewModel>>> GetAllAsync()
    {
        try
        {
            var students = await repository.GetAllAsync();
            return new Response<List<StudentResponseViewModel>>
            {
                Data = mapper.Map<List<StudentResponseViewModel>>(students),
                Message = "Alunos listados com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<List<StudentResponseViewModel>>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<StudentResponseViewModel>> GetByIdAsync(Guid id)
    {
        try
        {
            var student = await repository.GetByIdAsync(id);
            if (student is null)
            {
                return new Response<StudentResponseViewModel>
                {
                    Code = HttpStatusCode.NotFound,
                    Message = "Aluno não encontrado"
                };
            }

            return new Response<StudentResponseViewModel>
            {
                Data = mapper.Map<StudentResponseViewModel>(student),
                Message = "Aluno encontrado com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<StudentResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }
}
