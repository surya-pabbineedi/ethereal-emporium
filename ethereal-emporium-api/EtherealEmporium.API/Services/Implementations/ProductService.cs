using EtherealEmporium.API.Data;
using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace EtherealEmporium.API.Services.Implementations;

public class ProductService(ApplicationDbContext applicationDbContext) : IProductService
{
    public async Task<List<Product>> ListAsync()
    {
        return await applicationDbContext.Products!.ToListAsync();
    }

    public async Task<Product> GetByIdAsync(string id)
    {
        return (await applicationDbContext.Products!.FindAsync(id) ?? null)!;
    }

    public async Task<Product> CreateAsync(Product product)
    {
        applicationDbContext.Products?.Add(product);
        await applicationDbContext.SaveChangesAsync();

        return product;
    }

    public async Task UpdateAsync(string id, Product product)
    {
        applicationDbContext.Products!.Update(product);
        await applicationDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        applicationDbContext.Products!.Remove(product);
        await applicationDbContext.SaveChangesAsync();
    }
}