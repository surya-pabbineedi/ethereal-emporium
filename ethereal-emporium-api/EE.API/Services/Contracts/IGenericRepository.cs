namespace EE.API.Services.Contracts;

public interface IGenericRepository<T> where T: class
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> GetById(string id);
    Task<T> Create(T entity);
    Task<T> Update(T entity);
    Task<bool> Delete(string id);
}