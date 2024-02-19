using EtherealEmporium.API.Models;
using EtherealEmporium.API.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EtherealEmporium.API.Filters.ActionFilters;

public class ProductValidateProductFilterAttribute(IProductService productService) : ActionFilterAttribute
{
    private IProductService ProductService { get; } = productService;

    public override async void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);

        var productId = context.ActionArguments["id"] as string;
        if (!Guid.TryParse(productId, out _))
        {
            context.ModelState.AddModelError("id", "ProductId is invalid.");
        }

        if (context.ModelState is { IsValid: false, Count: > 0 })
        {
            var problems = new ValidationProblemDetails(context.ModelState)
            {
                Status = StatusCodes.Status400BadRequest
            };
            context.Result = new BadRequestObjectResult(problems);
        }


        context.HttpContext.Items["product"] = await ProductService.GetByIdAsync(productId!);
    }
}