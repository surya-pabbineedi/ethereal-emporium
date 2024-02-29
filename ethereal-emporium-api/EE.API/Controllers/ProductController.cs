using EE.API.Models;
using EE.API.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EE.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IProductRepository productService) : ControllerBase
    {
        // GET: api/<Product>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await productService.GetAll());
        }

        // GET api/<Product>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await productService.GetById(id));
        }
        
        [HttpGet("search/{query}")]
        public async Task<IActionResult> Search(string query)
        {
            return Ok(await productService.Search(query));
        }

        // POST api/<Product>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Product>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Product>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}