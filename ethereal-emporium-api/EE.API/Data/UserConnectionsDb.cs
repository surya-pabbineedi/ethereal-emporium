using System.Collections.Concurrent;

namespace EE.API.Data;

public class UserConnectionsDb
{
    private readonly ConcurrentDictionary<string, string> _userConnections = new();
    public ConcurrentDictionary<string, string> Connections => _userConnections;
}