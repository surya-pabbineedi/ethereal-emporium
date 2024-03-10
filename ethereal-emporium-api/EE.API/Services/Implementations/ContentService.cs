using System.Diagnostics;
using EE.API.Data;
using EE.API.Hubs;
using EE.API.Services.Contracts;
using Hangfire.Server;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace EE.API.Services.Implementations;

public class ContentService<T>(ApplicationDbContext dbContext, IHubContext<NotificationHub> hubContext)
    : IContentService<T>
    where T : class
{
    private readonly DbSet<T> _dbSet = dbContext.Set<T>();

    public async Task<string> ImportAsync(IEnumerable<T> entities, PerformContext? context)
    {
        try
        {
            Console.WriteLine("Import of products has been initiated");

            try
            {
                await _dbSet.AddRangeAsync(entities);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            await hubContext.Clients.All.SendAsync("ImportSuccess", new
            {
                jobId = context?.BackgroundJob.Id, entityType = "products"
            });
            return string.Empty;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        return string.Empty;
    }
}