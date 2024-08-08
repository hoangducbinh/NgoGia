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
public class OrderDetailsController : ControllerBase
{
   private readonly ApplicationDBContext _context;


    public OrderDetailsController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
    {
        return await _context.OrderDetails.Include(od => od.Product)
                                          .Include(od => od.Order)
                                          .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDetail>> GetOrderDetail(int id)
    {
        var orderDetail = await _context.OrderDetails.Include(od => od.Product)
                                                     .Include(od => od.Order)
                                                     .FirstOrDefaultAsync(od => od.OrderDetailID == id);
        if (orderDetail == null)
        {
            return NotFound();
        }
        return orderDetail;
    }

    [HttpPost]
    public async Task<ActionResult<OrderDetail>> CreateOrderDetail(OrderDetail orderDetail)
    {
        _context.OrderDetails.Add(orderDetail);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrderDetail), new { id = orderDetail.OrderDetailID }, orderDetail);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrderDetail(int id, OrderDetail orderDetail)
    {
        if (id != orderDetail.OrderDetailID)
        {
            return BadRequest();
        }
        _context.Entry(orderDetail).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderDetailExists(id))
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
    public async Task<IActionResult> DeleteOrderDetail(int id)
    {
        var orderDetail = await _context.OrderDetails.FindAsync(id);
        if (orderDetail == null)
        {
            return NotFound();
        }
        _context.OrderDetails.Remove(orderDetail);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool OrderDetailExists(int id)
    {
        return _context.OrderDetails.Any(e => e.OrderDetailID == id);
    }
}

}