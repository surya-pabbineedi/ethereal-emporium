using Hangfire.Server;

namespace EE.API.Services.Contracts;

public interface IContentService<T> where T : class
{
    Task<string> ImportAsync(IEnumerable<T> entities, PerformContext? context);
}