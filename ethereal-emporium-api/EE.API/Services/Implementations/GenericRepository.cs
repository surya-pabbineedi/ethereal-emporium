using EE.API.Data;
using EE.API.Models;
using EE.API.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace EE.API.Services.Implementations;

public class GenericRepository<T>(ApplicationDbContext dbContext) : IGenericRepository<T>
    where T : BaseEntity
{
    internal readonly DbSet<T> DbSet = dbContext.Set<T>();

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
        entity.Id = Guid.NewGuid();
        entity.Created = DateTime.UtcNow;
        await DbSet.AddAsync(entity);
        await dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task<bool> Update(string id, T entity)
    {
        var savedEntity = await GetById(id);
        if (savedEntity is null)
        {
            return false;
        }
        
        entity.Updated = DateTime.UtcNow;
        DbSet.Update(entity);
        await dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(string id)
    {
        var entity = await DbSet.FindAsync(id);

        if (entity is null)
        {
            return false;
        }

        DbSet.Remove(entity);
        await dbContext.SaveChangesAsync();

        return true;
    }
}