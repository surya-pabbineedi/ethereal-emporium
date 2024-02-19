using EtherealEmporium.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EtherealEmporium.API.Controllers;

public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(new List<User>());
    }
}