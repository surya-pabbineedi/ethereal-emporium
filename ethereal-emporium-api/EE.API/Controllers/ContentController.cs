using EE.API.Models;
using EE.API.Services.Contracts;
using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EE.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController(IContentService<Product> productContentService) : ControllerBase
    {
        // POST api/<ContentController>
        [HttpPost]
        [Route("products")]
        public IActionResult Post([FromBody] BulkImport bulkImport)
        {
            if ((bulkImport.Products ?? throw new InvalidOperationException()).Any())
            {
                foreach (var bulkImportProduct in bulkImport.Products)
                {
                    bulkImportProduct.Id = Guid.NewGuid();
                }

                return Ok(BackgroundJob.Enqueue<IContentService<Product>>(service =>
                    service.ImportAsync(bulkImport.Products, null)));
            }

            return NoContent();
        }
    }
}