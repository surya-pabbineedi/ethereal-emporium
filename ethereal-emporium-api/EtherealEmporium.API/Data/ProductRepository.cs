using System.Globalization;
using EtherealEmporium.API.Models;
using MongoDB.Bson;

namespace EtherealEmporium.API.Data;

public static class ProductRepository
{
    private static readonly List<Product> ProductsStore =
    [
    ];

    public static IList<Product> GetProducts()
    {
        return ProductsStore;
    }

    private static Product? GetProductById(int productId)
    {
        return ProductsStore.Find(entry => entry.Id == productId);
    }

    public static Product AddProduct(Product product)
    {
        product.Id = 1;
        ProductsStore.Add(product);

        return product;
    }

    public static void UpdateProduct(Product product)
    {
        if (product.Id != null)
        {
            var storeProduct = GetProductById(product.Id);
        }
    }
}