using Bogus;
using Bogus.Extensions.Brazil;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;

namespace DM.TransporteEscolar.UnityTests.Domain.Service;
public class StudentServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<IStudentRepository> _repository;
    private readonly StudentService _service;

    public StudentServiceTests()
    {
        _faker = new Faker();
        var mocker = new AutoMocker();
        _repository = mocker.GetMock<IStudentRepository>();
        _service = mocker.CreateInstance<StudentService>();
    }

    [Fact]
    public async Task AddAsync_ShouldReturnStudent_WhenStudentIsValid()
    {
        // Arrange
        var student = new Student
        {
            Id = Guid.NewGuid(),
            Name = _faker.Person.FullName,
            Address = _faker.Address.FullAddress(),
            BirthDate = DateOnly.FromDateTime(_faker.Date.Past()),
            Cpf = _faker.Person.Cpf(),
            UserId = Guid.NewGuid(),
            ZipCode = _faker.Address.ZipCode()
        };

        _repository.Setup(x => x.AddAsync(student)).ReturnsAsync(student);

        // Act
        var result = await _service.AddAsync(student);

        // Assert
        result.Should().BeEquivalentTo(student);
        _repository.Verify(x => x.AddAsync(student), Times.Once);
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
    public async Task UpdateAsync_ShouldReturnStudent_WhenStudentIsValid()
    {
        // Arrange
        var student = new Student
        {
            Id = Guid.NewGuid(),
            Name = _faker.Person.FullName,
            Address = _faker.Address.FullAddress(),
            BirthDate = DateOnly.FromDateTime(_faker.Date.Past()),
            Cpf = _faker.Person.Cpf(),
            UserId = Guid.NewGuid(),
            ZipCode = _faker.Address.ZipCode()
        };

        var id = Guid.NewGuid();

        _repository.Setup(x => x.UpdateAsync(student, id)).ReturnsAsync(student);

        // Act
        var result = await _service.UpdateAsync(student, id);

        // Assert
        result.Should().BeEquivalentTo(student);
        _repository.Verify(x => x.UpdateAsync(student, id), Times.Once);
    }
}
