using EtherealEmporium.API.Controllers;
using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Contracts;
using EtherealEmporium.Tests.Fixtures;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace EtherealEmporium.Tests.Systems.Controllers;

public class ProductsControllerTest()
{
    [Fact]
    public async Task Get_OnSuccess_ReturnStatusCode200()
    {
        // Arrange
        var mockProductService = new Mock<IProductService>();
        mockProductService.Setup(services => services.ListAsync()).ReturnsAsync([]);
        var productController = new ProductController(mockProductService.Object);
        
        // Act
        var result = (OkObjectResult) await productController.GetProducts();
        
        // Assert
        result.StatusCode.Should().Be(200);
    }

    [Fact]
    public async Task Get_OnSuccess_InvokesService()
    {
        // Arrange
        var mockProductService = new Mock<IProductService>();
        mockProductService.Setup((services => services.ListAsync())).ReturnsAsync(ProductFixtures.GetProducts());
        var productController = new ProductController(mockProductService.Object);
        
        // Act
        await productController.GetProducts();
        
        // Assert
        mockProductService.Verify(services => services.ListAsync(), Times.Once);
    }

    [Fact]
    public async Task Get_OnSuccess_ReturnsListOfProducts()
    {
        // Arrange
        var mockProductService = new Mock<IProductService>();
        mockProductService.Setup((services => services.ListAsync())).ReturnsAsync(ProductFixtures.GetProducts());
        var productController = new ProductController(mockProductService.Object);
        
        // Act
       var result = (OkObjectResult)await productController.GetProducts();
        
        // Assert
        result.Should().BeOfType<OkObjectResult>();
        result.Value.Should().BeOfType<List<Product>>();
    }
}