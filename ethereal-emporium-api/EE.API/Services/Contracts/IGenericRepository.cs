namespace EE.API.Services.Contracts;

public interface IGenericRepository<T> where T: class
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetById(string id);
    Task<T> Create(T entity);
    Task<bool> Update(string id, T entity);
    Task<bool> Delete(string id);
}