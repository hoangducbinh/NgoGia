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
public class OrdersController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public OrdersController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders.Include(o => o.OrderDetails).ToListAsync();
    }

    [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders.Include(o => o.OrderDetails)
                                         .FirstOrDefaultAsync(o => o.OrderID == id);
        if (order == null)
        {
            return NotFound();
        }
        return order;
    }

    [HttpPost("Create")]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrder), new { id = order.OrderID }, order);
    }

    [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.OrderID)
        {
            return BadRequest();
        }
        _context.Entry(order).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
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
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool OrderExists(int id)
    {
        return _context.Orders.Any(e => e.OrderID == id);
    }
}

}