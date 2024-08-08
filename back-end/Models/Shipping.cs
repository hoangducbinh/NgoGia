using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class Shipping
    {
        public int ShippingID { get; set; }
        public int OrderID { get; set; }
        public string ShippingAddress { get; set; }
        public DateTime ShippingDate { get; set; }

        public Order Order { get; set; }
    }
}