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

    public static Product? GetProductById(ObjectId productId)
    {
        return ProductsStore.Find(entry => entry.Id == productId);
    }

    public static Product AddProduct(Product product)
    {
        product.Id = ObjectId.GenerateNewId();
        ProductsStore.Add(product);

        return product;
    }

    public static void UpdateProduct(Product product)
    {
        var storeProduct = GetProductById(product.Id);
    }
}