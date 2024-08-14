using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ProductsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Products/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.CategoryProduct) // Include CategoryProduct details
                .ToListAsync();
        }

        // GET: api/Products/GetById/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct) // Include CategoryProduct details
                .FirstOrDefaultAsync(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: api/Products/Create
        [HttpPost("Create")]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            // Validate if CategoryProduct exists
            var category = await _context.CategoryProducts.FindAsync(product.CategoryProduct.CategoryProductID);
            if (category == null)
            {
                return BadRequest("Invalid CategoryProductID");
            }

            // Set the CategoryProduct reference to the found category
            product.CategoryProduct = category;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductID }, product);
        }


        // PUT: api/Products/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.ProductID)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Products/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if a Product exists by ID
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductID == id);
        }
    }
}
