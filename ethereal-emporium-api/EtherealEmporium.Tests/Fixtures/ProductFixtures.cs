using System.Globalization;
using EtherealEmporium.API.Models;
using MongoDB.Bson;

namespace EtherealEmporium.Tests.Fixtures;

public abstract class ProductFixtures
{
    public static List<Product> GetProducts() =>
    [
        new Product() { Id = 1, Title = "iphone 14" },
        new Product() { Id = 2, Title = "Mac Book Pro" }
    ];
}