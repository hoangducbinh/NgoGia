using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace back_end.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public string Receiver { get; set; }
        public string PhoneNumber { get; set; }
    }
}