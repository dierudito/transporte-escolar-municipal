using AutoMapper;
using Bogus;
using DM.TransporteEscolar.Application.AppServices;
using DM.TransporteEscolar.Application.Enums;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Enums;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using Moq;
using Moq.AutoMock;
using System.Net;

namespace DM.TransporteEscolar.UnityTests.Application.AppService;
public class UserAppServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<IUserService> _service;
    private readonly Mock<IUserRepository> _repository;
    private readonly Mock<IMapper> _mapper;
    private readonly UserAppService _appService;

    public UserAppServiceTests()
    {
        var mocker = new AutoMocker();
        _faker = new();
        _service = mocker.GetMock<IUserService>();
        _repository = mocker.GetMock<IUserRepository>();
        _mapper = mocker.GetMock<IMapper>();
        _appService = mocker.CreateInstance<UserAppService>();
    }

    [Fact]
    public async Task AddAsync_WhenUserIsNull_ReturnBadRequest()
    {
        // Arrange
        var request =
            new AddUserRequestViewModel(_faker.Person.FullName, _faker.Person.Email,
            _faker.Internet.Password(), UserTypeViewModel.Admin, _faker.Person.Phone, _faker.Address.FullAddress());

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
        _service.Verify(s => s.AddAsync(It.IsAny<User>()), Times.Never);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Never);
    }

    [Fact]
    public async Task AddAsync_WhenServiceAddAsyncReturnsNull_ReturnBadRequest()
    {
        // Arrange
        var request =
            new AddUserRequestViewModel(_faker.Person.FullName, _faker.Person.Email,
            _faker.Internet.Password(), UserTypeViewModel.Parent, _faker.Person.Phone, _faker.Address.FullAddress());
        var entity = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = request.Password,
            UserType = UserType.Parent,
            Phone = request.Phone,
            Address = request.Address
        };
        _mapper.Setup(m => m.Map<User>(request)).Returns(entity);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
    }

    [Fact]
    public async Task AddAsync_WhenSuccefully_ReturnSuccess()
    {
        // Arrange
        var request =
            new AddUserRequestViewModel(_faker.Person.FullName, _faker.Person.Email,
            _faker.Internet.Password(), UserTypeViewModel.Parent, null, null);
        var entity = new User
        {
            Name = request.Name,
            Email = request.Email,
            Password = request.Password,
            UserType = UserType.Parent,
            Phone = request.Phone,
            Address = request.Address
        };
        var response =
            new UserResponseViewModel(entity.Id, entity.Name, entity.Email, entity.Password,
            UserTypeViewModel.Parent, null, null);
        _mapper.Setup(m => m.Map<User>(request)).Returns(entity);
        _service.Setup(s => s.AddAsync(entity)).ReturnsAsync(entity);
        _mapper.Setup(m => m.Map<UserResponseViewModel>(entity)).Returns(response);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(response, result.Data);
        _service.Verify(s => s.AddAsync(entity), Times.Once);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}