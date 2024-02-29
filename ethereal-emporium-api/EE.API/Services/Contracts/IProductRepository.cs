using EE.API.Models;

namespace EE.API.Services.Contracts;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<IEnumerable<Product>> Search(string search);
}