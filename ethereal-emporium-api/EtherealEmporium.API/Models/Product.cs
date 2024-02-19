using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.EntityFrameworkCore;

namespace EtherealEmporium.API.Models;

public class Product
{
    public ObjectId Id { get; set; }
    
    public string Title { get; set; }
    
    public string? Description { get; set; }
    
    public int? Price { get; set; }
    
    public double? DiscountPercentage { get; set; }
    
    public double? Rating { get; set; }
    
    public int? Stock { get; set; }
    
    public string? Brand { get; set; }
    
    public string? Category { get; set; }
    
    public string Thumbnail { get; set; }
    
    public List<string> Images { get; set; }
}