using AutoMapper;
using Bogus;
using DM.TransporteEscolar.Application.AppServices;
using DM.TransporteEscolar.Application.ViewModels.Requests;
using DM.TransporteEscolar.Application.ViewModels.Responses;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Interfaces.Services;
using Moq;
using Moq.AutoMock;
using System.Net;

namespace DM.TransporteEscolar.UnityTests.Application.AppService;
public class SchoolAppServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<ISchoolService> _service;
    private readonly Mock<ISchoolRepository> _repository;
    private readonly Mock<IMapper> _mapper;
    private readonly SchoolAppService _appService;

    public SchoolAppServiceTests()
    {
        var mocker = new AutoMocker();
        _faker = new();
        _service = mocker.GetMock<ISchoolService>();
        _repository = mocker.GetMock<ISchoolRepository>();
        _mapper = mocker.GetMock<IMapper>();
        _appService = mocker.CreateInstance<SchoolAppService>();
    }

    [Fact]
    public async Task AddAsync_WhenSchoolIsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddSchoolRequestViewModel(
            _faker.Person.FullName,
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Phone.PhoneNumber());

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
        _service.Verify(s => s.AddAsync(It.IsAny<School>()), Times.Never);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Never);
    }

    [Fact]
    public async Task AddAsync_WhenServiceAddAsyncReturnsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddSchoolRequestViewModel(
            _faker.Person.FullName,
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Phone.PhoneNumber());

        var entity = new School
        {
            Address = request.Address,
            Name = request.Name,
            Phone = request.Phone,
            ZipCode = request.ZipCode
        };
        _mapper.Setup(m => m.Map<School>(request)).Returns(entity);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
    }

    [Fact]
    public async Task AddAsync_WhenSuccefully_ReturnSuccess()
    {
        // Arrange
        var request = new AddSchoolRequestViewModel(
            _faker.Person.FullName,
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Phone.PhoneNumber());
        var entity = new School
        {
            Address = request.Address,
            Name = request.Name,
            Phone = request.Phone,
            ZipCode = request.ZipCode
        };
        var response =
            new SchoolResponseViewModel(entity.Id,
            _faker.Person.FullName,
            _faker.Address.FullAddress(),
            _faker.Address.ZipCode(),
            _faker.Phone.PhoneNumber());

        _mapper.Setup(m => m.Map<School>(request)).Returns(entity);
        _service.Setup(s => s.AddAsync(entity)).ReturnsAsync(entity);
        _mapper.Setup(m => m.Map<SchoolResponseViewModel>(entity)).Returns(response);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(response, result.Data);
        _service.Verify(s => s.AddAsync(entity), Times.Once);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}