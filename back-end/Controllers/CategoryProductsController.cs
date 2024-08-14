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
    public class CategoryProductsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public CategoryProductsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/CategoryProducts/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CategoryProduct>>> GetCategoryProducts()
        {
            return await _context.CategoryProducts.ToListAsync();
        }

        // GET: api/CategoryProducts/GetById/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CategoryProduct>> GetCategoryProduct(int id)
        {
            var categoryProduct = await _context.CategoryProducts.FindAsync(id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            return categoryProduct;
        }

        // POST: api/CategoryProducts/Create
        [HttpPost("Create")]
        public async Task<ActionResult<CategoryProduct>> CreateCategoryProduct(CategoryProduct categoryProduct)
        {
            _context.CategoryProducts.Add(categoryProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategoryProduct), new { id = categoryProduct.CategoryProductID }, categoryProduct);
        }

        // PUT: api/CategoryProducts/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCategoryProduct(int id, CategoryProduct categoryProduct)
        {
            if (id != categoryProduct.CategoryProductID)
            {
                return BadRequest();
            }

            _context.Entry(categoryProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryProductExists(id))
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

        // DELETE: api/CategoryProducts/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCategoryProduct(int id)
        {
            var categoryProduct = await _context.CategoryProducts.FindAsync(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            _context.CategoryProducts.Remove(categoryProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryProductExists(int id)
        {
            return _context.CategoryProducts.Any(e => e.CategoryProductID == id);
        }
    }
}