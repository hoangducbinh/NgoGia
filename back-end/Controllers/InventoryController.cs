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
public class InventoryController : ControllerBase
{
private readonly ApplicationDBContext _context;

    public InventoryController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Inventory>>> GetInventories()
    {
        return await _context.Inventories.Include(i => i.Product)
                                         .Include(i => i.Warehouse)
                                         .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Inventory>> GetInventory(int id)
    {
        var inventory = await _context.Inventories.Include(i => i.Product)
                                                  .Include(i => i.Warehouse)
                                                  .FirstOrDefaultAsync(i => i.InventoryID == id);
        if (inventory == null)
        {
            return NotFound();
        }
        return inventory;
    }

    [HttpPost]
    public async Task<ActionResult<Inventory>> CreateInventory(Inventory inventory)
    {
        _context.Inventories.Add(inventory);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetInventory), new { id = inventory.InventoryID }, inventory);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInventory(int id, Inventory inventory)
    {
        if (id != inventory.InventoryID)
        {
            return BadRequest();
        }
        _context.Entry(inventory).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!InventoryExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInventory(int id)
    {
        var inventory = await _context.Inventories.FindAsync(id);
        if (inventory == null)
        {
            return NotFound();
        }
        _context.Inventories.Remove(inventory);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool InventoryExists(int id)
    {
        return _context.Inventories.Any(e => e.InventoryID == id);
    }
}

}