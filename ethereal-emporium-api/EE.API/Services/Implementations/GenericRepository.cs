using EE.API.Data;
using EE.API.Models;
using EE.API.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace EE.API.Services.Implementations;

public class GenericRepository<T>: IGenericRepository<T> where T : class
{
    protected ApplicationDbContext DbContext;
    internal readonly DbSet<T> DbSet;

    public GenericRepository( ApplicationDbContext dbContext)
    {
        DbContext = dbContext;
        DbSet = dbContext.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        return await DbSet.ToListAsync();
    }

    public async Task<T?> GetById(string id)
    {
        return await DbSet.FindAsync(id);
    }

    public async Task<T> Create(T entity)
    {
        await DbSet.AddAsync(entity);
        return entity;
    }

    public async Task<T> Update(T entity)
    {
         DbSet.Update(entity);
         return entity;
    }

    public async Task<bool> Delete(string id)
    {
        throw new NotImplementedException();
    }
}