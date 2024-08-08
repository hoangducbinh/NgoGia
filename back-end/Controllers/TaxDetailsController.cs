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
public class TaxDetailsController : ControllerBase
{
private readonly ApplicationDBContext _context;

    public TaxDetailsController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaxDetail>>> GetTaxDetails()
    {
        return await _context.TaxDetails.Include(td => td.Invoice)
                                        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaxDetail>> GetTaxDetail(int id)
    {
        var taxDetail = await _context.TaxDetails.Include(td => td.Invoice)
                                                 .FirstOrDefaultAsync(td => td.TaxDetailID == id);
        if (taxDetail == null)
        {
            return NotFound();
        }
        return taxDetail;
    }

    [HttpPost]
    public async Task<ActionResult<TaxDetail>> CreateTaxDetail(TaxDetail taxDetail)
    {
        _context.TaxDetails.Add(taxDetail);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTaxDetail), new { id = taxDetail.TaxDetailID }, taxDetail);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTaxDetail(int id, TaxDetail taxDetail)
    {
        if (id != taxDetail.TaxDetailID)
        {
            return BadRequest();
        }
        _context.Entry(taxDetail).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaxDetailExists(id))
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
    public async Task<IActionResult> DeleteTaxDetail(int id)
    {
        var taxDetail = await _context.TaxDetails.FindAsync(id);
        if (taxDetail == null)
        {
            return NotFound();
        }
        _context.TaxDetails.Remove(taxDetail);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool TaxDetailExists(int id)
    {
        return _context.TaxDetails.Any(e => e.TaxDetailID == id);
    }
}

}