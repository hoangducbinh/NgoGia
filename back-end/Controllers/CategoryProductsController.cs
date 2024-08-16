using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;
using back_end.DTOs;

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
        public async Task<ActionResult<IEnumerable<CategoryProductDetailDTO>>> GetCategoryProducts()
        {
            return await _context.CategoryProducts
                .Select(cp => new CategoryProductDetailDTO
                {
                    CategoryProductID = cp.CategoryProductID,
                    CategoryProductName = cp.CategoryProductName
                })
                .ToListAsync();
        }

        // GET: api/CategoryProducts/GetById/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<CategoryProductDetailDTO>> GetCategoryProduct(string id)
        {
            var categoryProduct = await _context.CategoryProducts
                .Select(cp => new CategoryProductDetailDTO
                {
                    CategoryProductID = cp.CategoryProductID,
                    CategoryProductName = cp.CategoryProductName
                })
                .FirstOrDefaultAsync(cp => cp.CategoryProductID == id);

            if (categoryProduct == null)
            {
                return NotFound();
            }

            return categoryProduct;
        }

        private string GenerateCustomID()
        {
            return "DMTHN" + new Random().Next(1000, 9999).ToString(); // Ví dụ định dạng ID: THN1234
        }
        // POST: api/CategoryProducts/Create
        [HttpPost("Create")]
        public async Task<ActionResult<CategoryProductDetailDTO>> CreateCategoryProduct(CategoryProductDTO categoryProductDTO)
        {
            var newProductID = GenerateCustomID(); // Tạo ID mới
            var categoryProduct = new CategoryProduct
            {
                CategoryProductID = newProductID,
                CategoryProductName = categoryProductDTO.CategoryProductName
            };
            _context.CategoryProducts.Add(categoryProduct);
            await _context.SaveChangesAsync();

            var result = new CategoryProductDetailDTO
            {
                CategoryProductID = categoryProduct.CategoryProductID,
                CategoryProductName = categoryProduct.CategoryProductName
            };

            return CreatedAtAction(nameof(GetCategoryProduct), new { id = result.CategoryProductID }, result);
        }

        // PUT: api/CategoryProducts/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCategoryProduct(string id, CategoryProductDetailDTO categoryProductDTO)
        {
            if (id != categoryProductDTO.CategoryProductID)
            {
                return BadRequest();
            }

            var categoryProduct = await _context.CategoryProducts.FindAsync(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            // Update the categoryProduct entity
            categoryProduct.CategoryProductName = categoryProductDTO.CategoryProductName;

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
        public async Task<IActionResult> DeleteCategoryProduct(string id)
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

        // Helper method to check if a CategoryProduct exists by ID
        private bool CategoryProductExists(string id)
        {
            return _context.CategoryProducts.Any(e => e.CategoryProductID == id);
        }
    }
}
