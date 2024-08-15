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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ProductsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Products/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProductDetailDTO>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.CategoryProduct)
                .Select(p => new ProductDetailDTO
                {
                    ProductID = p.ProductID,
                    ProductName = p.ProductName,
                    Unit = p.Unit,
                    SellPrice = p.SellPrice,
                    ImportPrice = p.ImportPrice,
                    Description = p.Description,
                    CategoryProductID = p.CategoryProductID,
                    CategoryProductName = p.CategoryProduct.CategoryProductName
                })
                .ToListAsync();
        }

        // GET: api/Products/GetById/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<ProductDetailDTO>> GetProduct(string id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .Select(p => new ProductDetailDTO
                {
                    ProductID = p.ProductID,
                    ProductName = p.ProductName,
                    Unit = p.Unit,
                    SellPrice = p.SellPrice,
                    ImportPrice = p.ImportPrice,
                    Description = p.Description,
                    Quantity = p.Quantity,
                    CategoryProductID = p.CategoryProductID,
                    CategoryProductName = p.CategoryProduct.CategoryProductName
                })
                .FirstOrDefaultAsync(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        private string GenerateCustomID()
        {
            return "THN" + new Random().Next(1000, 9999).ToString(); // Ví dụ định dạng ID: THN1234
        }

        // POST: api/Products/Create
        [HttpPost("Create")]
        public async Task<ActionResult<ProductDetailDTO>> CreateProduct(ProductDTO productDTO)
        {
            // Validate if CategoryProduct exists
            var category = await _context.CategoryProducts.FindAsync(productDTO.CategoryProductID);
            if (category == null)
            {
                return BadRequest("Invalid CategoryProductID");
            }

            var newProductID = GenerateCustomID(); // Tạo ID mới

            // Map ProductDTO to Product entity
            var product = new Product
            {
                ProductID = newProductID,
                ProductName = productDTO.ProductName,
                Unit = productDTO.Unit,
                SellPrice = productDTO.SellPrice,
                ImportPrice = productDTO.ImportPrice,
                Description = productDTO.Description,
                Quantity = productDTO.Quantity,
                CategoryProductID = productDTO.CategoryProductID
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var result = new ProductDetailDTO
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                Unit = product.Unit,
                SellPrice = product.SellPrice,
                ImportPrice = product.ImportPrice,
                Description = product.Description,
                Quantity = product.Quantity,
                CategoryProductID = product.CategoryProductID,
                CategoryProductName = category.CategoryProductName
            };

            return CreatedAtAction(nameof(GetProduct), new { id = result.ProductID }, result);
        }

        // PUT: api/Products/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(string id, ProductDTO productDTO)
        {
            if (id != productDTO.ProductID)
            {
                return BadRequest("ID mismatch");
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Map ProductDTO to existing Product entity
            product.ProductName = productDTO.ProductName;
            product.Unit = productDTO.Unit;
            product.SellPrice = productDTO.SellPrice;
            product.ImportPrice = productDTO.ImportPrice;
            product.Description = productDTO.Description;
            product.Quantity = productDTO.Quantity;
            product.CategoryProductID = productDTO.CategoryProductID;

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
        public async Task<IActionResult> DeleteProduct(string id)
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
        private bool ProductExists(string id)
        {
            return _context.Products.Any(e => e.ProductID == id);
        }
    }
}
