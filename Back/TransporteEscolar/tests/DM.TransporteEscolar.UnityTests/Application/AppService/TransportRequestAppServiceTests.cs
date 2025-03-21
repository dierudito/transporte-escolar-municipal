using AutoMapper;
using Bogus;
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
public class TransportRequestAppServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<ITransportRequestService> _service;
    private readonly Mock<ITransportRequestRepository> _repository;
    private readonly Mock<IMapper> _mapper;
    private readonly TransportRequestAppService _appService;

    public TransportRequestAppServiceTests()
    {
        var mocker = new AutoMocker();
        _faker = new();
        _service = mocker.GetMock<ITransportRequestService>();
        _repository = mocker.GetMock<ITransportRequestRepository>();
        _mapper = mocker.GetMock<IMapper>();
        _appService = mocker.CreateInstance<TransportRequestAppService>();
    }

    [Fact]
    public async Task AddAsync_WhenTransportRequestIsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddTransportRequestRequestViewModel(null, Guid.NewGuid(), Guid.NewGuid());

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
        _service.Verify(s => s.AddAsync(It.IsAny<TransportRequest>()), Times.Never);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Never);
    }

    [Fact]
    public async Task AddAsync_WhenServiceAddAsyncReturnsNull_ReturnBadRequest()
    {
        // Arrange
        var request = new AddTransportRequestRequestViewModel(null, Guid.NewGuid(), Guid.NewGuid());
        var entity = new TransportRequest
        {
            SchoolId = request.SchoolId,
            StudentId = request.StudentId
        };
        _mapper.Setup(m => m.Map<TransportRequest>(request)).Returns(entity);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, result.Code);
    }

    [Fact]
    public async Task AddAsync_WhenSuccefully_ReturnSuccess()
    {
        // Arrange
        var request = new AddTransportRequestRequestViewModel(_faker.Lorem.Word(), Guid.NewGuid(), Guid.NewGuid());
        var entity = new TransportRequest
        {
            SchoolId = request.SchoolId,
            StudentId = request.StudentId,
            AdditionalInfo = request.AdditionalInfo
        };
        var response =
            new TransportRequestResponseViewModel(entity.Id, entity.AdditionalInfo, entity.StudentId, entity.SchoolId, StatusRequestViewModel.Pending);
        _mapper.Setup(m => m.Map<TransportRequest>(request)).Returns(entity);
        _service.Setup(s => s.AddAsync(entity)).ReturnsAsync(entity);
        _mapper.Setup(m => m.Map<TransportRequestResponseViewModel>(entity)).Returns(response);

        // Act
        var result = await _appService.AddAsync(request);

        // Assert
        Assert.Equal(response, result.Data);
        _service.Verify(s => s.AddAsync(entity), Times.Once);
        _repository.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}