using EE.API.Data;
using EE.API.Models;
using EE.API.Services.Contracts;
using EE.Services.Implementations;
using Microsoft.EntityFrameworkCore;

namespace EE.API.Services.Implementations;

public class ProductRepository(ApplicationDbContext dbContext)
    : GenericRepository<Product>(dbContext), IProductRepository
{
    public async Task<IEnumerable<Product>> Search(string search)
    {
        return await DbSet.Where(product => product.Title != null && product.Title.Contains(search)).ToListAsync();
    }
}