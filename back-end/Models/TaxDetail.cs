using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class TaxDetail
    {
        public int TaxDetailID { get; set; }
        public int InvoiceID { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxAmount { get; set; }

        public Invoice Invoice { get; set; }
    }
}