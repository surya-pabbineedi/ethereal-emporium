using EtherealEmporium.API.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace EtherealEmporium.API.Data;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Product>? Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        MapEntities(modelBuilder);
    }
    
    private void MapEntities(ModelBuilder modelBuilder)
    {
        var productBuilder = modelBuilder.Entity<Product>().ToCollection("products");
        productBuilder.Property(entry => entry.Title).HasElementName("title");
        productBuilder.Property(entry => entry.Description).HasElementName("description");
        productBuilder.Property(entry => entry.Brand).HasElementName("brand");
        productBuilder.Property(entry => entry.Category).HasElementName("category");
        productBuilder.Property(entry => entry.Price).HasElementName("price");
        productBuilder.Property(entry => entry.Rating).HasElementName("rating");
        productBuilder.Property(entry => entry.Thumbnail).HasElementName("thumbnail");
        productBuilder.Property(entry => entry.Stock).HasElementName("stock");
        productBuilder.Property(entry => entry.DiscountPercentage).HasElementName("discountPercentage");
        productBuilder.Property(entry => entry.Images).HasElementName("images");
    }
}