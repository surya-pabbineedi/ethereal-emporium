using EE.API.Data;
using Microsoft.AspNetCore.SignalR;

namespace EE.API.Hubs;

public class NotificationHub(UserConnectionsDb userConnectionsDb): Hub
{
    public async Task NotifyBulkImport(string jobId, string entityType)
    {
        Console.WriteLine("NotifyBulkImport Invoked");
        await Clients.All.SendAsync("BulkImportFinish", jobId, entityType);
    }
}