namespace EtherealEmporium.API.Services.Contracts;

public interface IDataService<T>
{
    Task<List<T>> ListAsync();
    Task<T> GetByIdAsync(string id);

    Task<T> CreateAsync(T entity);
    Task UpdateAsync(string id, T entity);
    Task DeleteAsync(T entity);
}