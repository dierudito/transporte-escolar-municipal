using Bogus;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Enums;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;

namespace DM.TransporteEscolar.UnityTests.Domain.Service;
public class TransportRequestServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<ITransportRequestRepository> _repository;
    private readonly TransportRequestService _service;

    public TransportRequestServiceTests()
    {
        _faker = new Faker();
        var mocker = new AutoMocker();
        _repository = mocker.GetMock<ITransportRequestRepository>();
        _service = mocker.CreateInstance<TransportRequestService>();
    }

    [Fact]
    public async Task AddAsync_ShouldReturnTransportRequest_WhenTransportRequestIsValid()
    {
        // Arrange
        var transactionRequest = new TransportRequest
        {
            Id = Guid.NewGuid(),
            SchoolId = Guid.NewGuid(),
            StudentId = Guid.NewGuid(),
            Date = _faker.Date.Recent(),
            Status = StatusRequest.Pending
        };

        _repository.Setup(x => x.AddAsync(transactionRequest)).ReturnsAsync(transactionRequest);

        // Act
        var result = await _service.AddAsync(transactionRequest);

        // Assert
        result.Should().BeEquivalentTo(transactionRequest);
        _repository.Verify(x => x.AddAsync(transactionRequest), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_ShouldCallRepository_WhenCalled()
    {
        // Arrange
        var id = Guid.NewGuid();

        // Act
        await _service.DeleteAsync(id);

        // Assert
        _repository.Verify(x => x.DeleteAsync(id), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnTransportRequest_WhenTransportRequestIsValid()
    {
        // Arrange
        var transactionRequest = new TransportRequest
        {
            Id = Guid.NewGuid(),
            SchoolId = Guid.NewGuid(),
            StudentId = Guid.NewGuid(),
            Date = _faker.Date.Recent(),
            Status = StatusRequest.Approved
        };

        _repository
            .Setup(x => x.UpdateAsync(transactionRequest, transactionRequest.Id))
            .ReturnsAsync(transactionRequest);

        // Act
        var result = await _service.UpdateAsync(transactionRequest, transactionRequest.Id);

        // Assert
        result.Should().BeEquivalentTo(transactionRequest);
        _repository.Verify(x => x.UpdateAsync(transactionRequest, transactionRequest.Id), Times.Once);
    }
}