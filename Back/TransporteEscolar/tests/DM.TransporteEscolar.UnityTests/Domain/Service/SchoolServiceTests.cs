using Bogus;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;

namespace DM.TransporteEscolar.UnityTests.Domain.Service;
public class SchoolServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<ISchoolRepository> _repository;
    private readonly SchoolService _service;

    public SchoolServiceTests()
    {
        _faker = new Faker();
        var mocker = new AutoMocker();
        _repository = mocker.GetMock<ISchoolRepository>();
        _service = mocker.CreateInstance<SchoolService>();
    }

    [Fact]
    public async Task AddAsync_ShouldReturnSchool_WhenSchoolIsValid()
    {
        // Arrange
        var school = new School
        {
            Id = Guid.NewGuid(),
            Name = _faker.Company.CompanyName(),
            Address = _faker.Address.FullAddress(),
            ZipCode = _faker.Address.ZipCode(),
            Phone = _faker.Phone.PhoneNumber()
        };

        _repository.Setup(x => x.AddAsync(school)).ReturnsAsync(school);

        // Act
        var result = await _service.AddAsync(school);

        // Assert
        result.Should().BeEquivalentTo(school);
        _repository.Verify(x => x.AddAsync(school), Times.Once);
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
    public async Task UpdateAsync_ShouldReturnSchool_WhenSchoolIsValid()
    {
        // Arrange
        var school = new School
        {
            Id = Guid.NewGuid(),
            Name = _faker.Company.CompanyName(),
            Address = _faker.Address.FullAddress(),
            ZipCode = _faker.Address.ZipCode(),
            Phone = _faker.Phone.PhoneNumber()
        };

        _repository.Setup(x => x.UpdateAsync(school, school.Id)).ReturnsAsync(school);

        // Act
        var result = await _service.UpdateAsync(school, school.Id);

        // Assert
        result.Should().BeEquivalentTo(school);
        _repository.Verify(x => x.UpdateAsync(school, school.Id), Times.Once);
    }
}
