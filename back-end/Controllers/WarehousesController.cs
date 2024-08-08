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
public class WarehousesController : ControllerBase
{
    private readonly ApplicationDBContext _context;


    public WarehousesController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Warehouse>>> GetWarehouses()
    {
        return await _context.Warehouses.ToListAsync();
    }

    [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<Warehouse>> GetWarehouse(int id)
    {
        var warehouse = await _context.Warehouses.FindAsync(id);
        if (warehouse == null)
        {
            return NotFound();
        }
        return warehouse;
    }

    [HttpPost("Create")]
    public async Task<ActionResult<Warehouse>> CreateWarehouse(Warehouse warehouse)
    {
        _context.Warehouses.Add(warehouse);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetWarehouse), new { id = warehouse.WarehouseID }, warehouse);
    }

    [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateWarehouse(int id, Warehouse warehouse)
    {
        if (id != warehouse.WarehouseID)
        {
            return BadRequest();
        }
        _context.Entry(warehouse).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!WarehouseExists(id))
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

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteWarehouse(int id)
    {
        var warehouse = await _context.Warehouses.FindAsync(id);
        if (warehouse == null)
        {
            return NotFound();
        }
        _context.Warehouses.Remove(warehouse);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool WarehouseExists(int id)
    {
        return _context.Warehouses.Any(e => e.WarehouseID == id);
    }
}

}