using EtherealEmporium.API.Data;
using EtherealEmporium.API.Filters.ActionFilters;
using EtherealEmporium.API.Filters.ExceptionFilters;
using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace EtherealEmporium.API.Controllers;

[Route("api/[controller]")]
public class ProductController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        return Ok(await productService.ListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(string id)
    {
        return Ok(await productService.GetByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        product = await productService.CreateAsync(product);
        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    [TypeFilter(typeof(ProductValidateProductFilterAttribute))]
    [TypeFilter(typeof(ProductHandleUpdateExceptionsFilterAttribute))]
    public IActionResult UpdateProduct(string id, [FromBody] Product product)
    {
        var savedProduct = HttpContext.Items["product"] as Product;
        
        savedProduct!.Title = product.Title;
        savedProduct.Description = product.Description;
        savedProduct.Category = product.Category;
        savedProduct.Brand = product.Brand;
        savedProduct.Thumbnail = product.Thumbnail;
        savedProduct.Images = product.Images;
        savedProduct.Price = product.Price;
        savedProduct.Stock = product.Stock;
        savedProduct.DiscountPercentage = product.DiscountPercentage;
        productService.UpdateAsync(id, savedProduct);
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    [TypeFilter(typeof(ProductValidateProductFilterAttribute))]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        var product = HttpContext.Items["product"] as Product;
        await productService.DeleteAsync(product!);
        return Ok();
    }
}