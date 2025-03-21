using Bogus;
using DM.TransporteEscolar.Domain.Entities;
using DM.TransporteEscolar.Domain.Interfaces.Repositories;
using DM.TransporteEscolar.Domain.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;

namespace DM.TransporteEscolar.UnityTests.Domain.Service;
public class UserServiceTests
{
    private readonly Faker _faker;
    private readonly Mock<IUserRepository> _repository;
    private readonly UserService _service;

    public UserServiceTests()
    {
        _faker = new Faker();
        var mocker = new AutoMocker();
        _repository = mocker.GetMock<IUserRepository>();
        _service = mocker.CreateInstance<UserService>();
    }

    [Fact]
    public async Task AddAsync_ShouldReturnUser_WhenUserIsValid()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = _faker.Person.FullName,
            Email = _faker.Person.Email,
            Password = _faker.Internet.Password()
        };

        _repository.Setup(x => x.AddAsync(user)).ReturnsAsync(user);

        // Act
        var result = await _service.AddAsync(user);

        // Assert
        result.Should().BeEquivalentTo(user);
        _repository.Verify(x => x.AddAsync(user), Times.Once);
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
    public async Task UpdateAsync_ShouldReturnUser_WhenUserIsValid()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = _faker.Person.FullName,
            Email = _faker.Person.Email,
            Password = _faker.Internet.Password()
        };

        _repository.Setup(x => x.UpdateAsync(user, user.Id)).ReturnsAsync(user);

        // Act
        var result = await _service.UpdateAsync(user, user.Id);

        // Assert
        result.Should().BeEquivalentTo(user);
        _repository.Verify(x => x.UpdateAsync(user, user.Id), Times.Once);
    }
}