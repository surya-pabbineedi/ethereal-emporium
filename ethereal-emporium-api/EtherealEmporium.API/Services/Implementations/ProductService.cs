using System.Net;
using EtherealEmporium.API.Data;
using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace EtherealEmporium.API.Services.Implementations;

public class ProductService(
    HttpClient httpClient,
    IOptions<ApiServiceConfig> apiServiceConfig) : IProductService
{
    public async Task<List<Product>> ListAsync()
    {
        var response = await httpClient.GetAsync($"{apiServiceConfig.Value.Url}/Product");

        if (response.StatusCode is HttpStatusCode.NotFound)
        {
            return [];
        }

        var productResponse =  await response.Content.ReadFromJsonAsync<ProductResponse>();
        return productResponse?.Products ?? [];
    }

    public async Task<Product?> GetByIdAsync(string id)
    {
        var response = await httpClient.GetAsync($"{apiServiceConfig.Value.Url}/Product/{id}");
        
        if (response.StatusCode is HttpStatusCode.NotFound)
        {
            return null;
        }

        return await response.Content.ReadFromJsonAsync<Product>();
    }

    public async Task<Product> CreateAsync(Product product)
    {
        // applicationDbContext.Products?.Add(product);
        // await applicationDbContext.SaveChangesAsync();

        return product;
    }

    public async Task UpdateAsync(string id, Product product)
    {
        // applicationDbContext.Products!.Update(product);
        // await applicationDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        // applicationDbContext.Products!.Remove(product);
        // await applicationDbContext.SaveChangesAsync();
    }
}