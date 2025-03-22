using AutoMapper;
using DM.TransporteEscolar.Application.Interfaces;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using System.Net;

namespace DM.TransporteEscolar.Application.AppServices;
public class UserAppService(IMapper mapper, IUserService service, IUserRepository repository)
    : IUserAppService
{
    public async Task<Response<UserResponseViewModel>> AddAsync(AddUserRequestViewModel user)
    {
        var entity = mapper.Map<User>(user);

        try
        {
            if (entity is null)
            {
                return new Response<UserResponseViewModel>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados do usuário"
                };
            }
            var result = await service.AddAsync(entity);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<UserResponseViewModel>
                {
                    Data = mapper.Map<UserResponseViewModel>(entity),
                    Message = "Usuário cadastrado com sucesso"
                };
            }

            return new Response<UserResponseViewModel>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao cadastrar usuário"
            };
        }
        catch (Exception e)
        {
            return new Response<UserResponseViewModel>
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
            if (!await repository.AreThereAsync(user => user.Id == id))
                return new Response<bool>
                {
                    Message = "Usuário excluído com sucesso"
                };

            await service.DeleteAsync(id);
            await repository.SaveChangesAsync();

            return new Response<bool>
            {
                Message = "Usuário excluído com sucesso"
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

    public async Task<Response<bool>> UpdateAsync(UpdateUserRequestViewModel user, Guid id)
    {
        var entity = mapper.Map<User>(user);

        try
        {
            if (entity is null)
            {
                return new Response<bool>
                {
                    Code = HttpStatusCode.BadRequest,
                    Message = "Não foi possível identificar os dados do usuário"
                };
            }

            var result = await service.UpdateAsync(entity, id);
            await repository.SaveChangesAsync();

            if (result is not null)
            {
                return new Response<bool>
                {
                    Message = "Usuário atualizado com sucesso"
                };
            }

            return new Response<bool>
            {
                Code = HttpStatusCode.BadRequest,
                Message = "Erro ao atualizar usuário"
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

    public async Task<Response<List<UserResponseViewModel>>> GetAllAsync()
    {
        try
        {
            var users = await repository.GetAllAsync();
            return new Response<List<UserResponseViewModel>>
            {
                Data = mapper.Map<List<UserResponseViewModel>>(users),
                Message = "Usuários listados com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<List<UserResponseViewModel>>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<UserResponseViewModel>> GetByIdAsync(Guid id)
    {
        try
        {
            var user = await repository.GetByIdAsync(id);
            if (user is null)
            {
                return new Response<UserResponseViewModel>
                {
                    Code = HttpStatusCode.NotFound,
                    Message = "Usuário não encontrado"
                };
            }

            return new Response<UserResponseViewModel>
            {
                Data = mapper.Map<UserResponseViewModel>(user),
                Message = "Usuário encontrado com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<UserResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }

    public async Task<Response<LoginResponseViewModel>> LoginAsync(LoginRequestViewModel login)
    {
        try
        {
            var user = await repository.GetUserByEmailAsync(login.Email);
            if (user is null)
            {
                return new Response<LoginResponseViewModel>
                {
                    Code = HttpStatusCode.Unauthorized,
                    Message = "Usuário ou senha inválidos"
                };
            }

            if (user.Password != login.Password)
            {
                return new Response<LoginResponseViewModel>
                {
                    Code = HttpStatusCode.Unauthorized,
                    Message = "Usuário ou senha inválidos"
                };
            }

            var userResponse = mapper.Map<UserResponseViewModel>(user);

            return new Response<LoginResponseViewModel>
            {
                Data = new("90708034-9a62-4d0d-8988-5e15a9638bca", userResponse),
                Message = "Usuário logado com sucesso"
            };
        }
        catch (Exception e)
        {
            return new Response<LoginResponseViewModel>
            {
                Code = HttpStatusCode.InternalServerError,
                Message = e.Message
            };
        }
    }
}
