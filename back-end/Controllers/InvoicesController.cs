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
public class InvoicesController : ControllerBase
{
    private readonly ApplicationDBContext _context;


    public InvoicesController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
        return await _context.Invoices.Include(i => i.Order)
                                      .ToListAsync();
    }

    [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var invoice = await _context.Invoices.Include(i => i.Order)
                                             .FirstOrDefaultAsync(i => i.InvoiceID == id);
        if (invoice == null)
        {
            return NotFound();
        }
        return invoice;
    }

    [HttpPost("Create")]
    public async Task<ActionResult<Invoice>> CreateInvoice(Invoice invoice)
    {
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetInvoice), new { id = invoice.InvoiceID }, invoice);
    }

    [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateInvoice(int id, Invoice invoice)
    {
        if (id != invoice.InvoiceID)
        {
            return BadRequest();
        }
        _context.Entry(invoice).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!InvoiceExists(id))
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
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            return NotFound();
        }
        _context.Invoices.Remove(invoice);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool InvoiceExists(int id)
    {
        return _context.Invoices.Any(e => e.InvoiceID == id);
    }
}

}