using EtherealEmporium.API.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EtherealEmporium.API.Filters.ExceptionFilters;

public class ProductHandleUpdateExceptionsFilterAttribute(IProductService productService) : ExceptionFilterAttribute
{
    public override async Task OnExceptionAsync(ExceptionContext context)
    {
        await base.OnExceptionAsync(context);

        var productId = context.RouteData.Values["id"] as string;
        if (!string.IsNullOrEmpty(productId) && !string.IsNullOrWhiteSpace(productId))
        {
            var product = await productService.GetByIdAsync(productId).ConfigureAwait(false);
            if (product == null)
            {
                context.ModelState.AddModelError("ProductId", "Product not found!");
                var problems = new ValidationProblemDetails(context.ModelState)
                {
                    Status = StatusCodes.Status404NotFound
                };
                context.Result = new NotFoundObjectResult(problems);
            }
        }
    }
}