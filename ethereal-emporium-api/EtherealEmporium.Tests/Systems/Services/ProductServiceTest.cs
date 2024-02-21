using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Implementations;
using EtherealEmporium.Tests.Fixtures;
using EtherealEmporium.Tests.Helpers;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using Moq.Protected;

namespace EtherealEmporium.Tests.Systems.Services;

public class ProductServiceTest
{
    [Fact]
    public async Task GetProducts_OnInvoked_HttpGet()
    {
        var mockProducts = ProductFixtures.GetProducts();
        var mockHandler = MockHttpHandler<ProductResponse>.SetupGetRequest(new ProductResponse()
        {
            Products = mockProducts
        });
        var httpClient = new HttpClient(mockHandler.Object);
        var productService = new ProductService(httpClient, Options.Create(new ApiServiceConfig()
        {
            Url = "https://dummyjson.com"
        }));

        var products = await productService.ListAsync();

        mockHandler.Protected().Verify("SendAsync", Times.Once());

        products.Should().BeOfType<Product>();
        products.Should().Equal(mockProducts);
    }
}