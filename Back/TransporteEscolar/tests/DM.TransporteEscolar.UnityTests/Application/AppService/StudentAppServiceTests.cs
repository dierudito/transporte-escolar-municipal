using AutoMapper;
using Bogus;
using Bogus.Extensions.Brazil;
using DM.TransporteEscolar.Application.AppServices;
using DM.TransporteEscolar.Application.Enums;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using Moq;
using Moq.AutoMock;
using System.Net;

namespace DM.TransporteEscolar.UnityTests.Application.AppService;
public class StudentAppServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<IStudentService> _service;
    private readonly Mock<IStudentRepository> _repository;
    private readonly Mock<IMapper> _mapper;
    private readonly StudentAppService _appService;

    public StudentAppServiceTests()
    {
        var mocker = new AutoMocker();
        _faker = new();
        _service = mocker.GetMock<IStudentService>();
        _repository = mocker.GetMock<IStudentRepository>();
        _mapper = mocker.GetMock<IMapper>();
        _appService = mocker.CreateInstance<StudentAppService>();
    }

    [Fact]
    public async Task AddAsync_WhenStudentIsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddStudentRequestViewModel(
            _faker.Person.FullName,
            DateOnly.FromDateTime(_faker.Date.Past()),
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Person.Cpf(),
            Guid.NewGuid());

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
        _service.Verify(s => s.AddAsync(It.IsAny<Student>()), Times.Never);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Never);
    }

    [Fact]
    public async Task AddAsync_WhenServiceAddAsyncReturnsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddStudentRequestViewModel(
            _faker.Person.FullName,
            DateOnly.FromDateTime(_faker.Date.Past()),
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Person.Cpf(),
            Guid.NewGuid());

        var entity = new Student
        {
            Address = request.Address,
            BirthDate = request.BirthDate,
            Cpf = request.Cpf,
            Name = request.Name,
            UserId = request.UserId,
            ZipCode = request.ZipCode
        };
        _mapper.Setup(m => m.Map<Student>(request)).Returns(entity);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
    }

    [Fact]
    public async Task AddAsync_WhenSuccefully_ReturnSuccess()
    {
        // Arrange
        var request = new AddStudentRequestViewModel(
            _faker.Person.FullName,
            DateOnly.FromDateTime(_faker.Date.Past()),
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Person.Cpf(),
            Guid.NewGuid());

        var entity = new Student
        {
            Address = request.Address,
            BirthDate = request.BirthDate,
            Cpf = request.Cpf,
            Name = request.Name,
            UserId = request.UserId,
            ZipCode = request.ZipCode
        };
        var response =
            new StudentResponseViewModel(
                entity.Id, entity.Name, entity.BirthDate, entity.Address, 
                entity.ZipCode, entity.Cpf, entity.UserId);
        _mapper.Setup(m => m.Map<Student>(request)).Returns(entity);
        _service.Setup(s => s.AddAsync(entity)).ReturnsAsync(entity);
        _mapper.Setup(m => m.Map<StudentResponseViewModel>(entity)).Returns(response);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(response, result.Data);
        _service.Verify(s => s.AddAsync(entity), Times.Once);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}