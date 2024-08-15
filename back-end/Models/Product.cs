using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class Product
    {
        public string ProductID { get; set; }
        public string ProductName { get; set; }
        public string Unit { get; set; }
        public decimal SellPrice { get; set; }
        public decimal ImportPrice { get; set; }
        public string Description { get; set; }
        public string CategoryProductID { get; set; }
        public int Quantity { get; set; }

        [ForeignKey("CategoryProductID")]
        public CategoryProduct CategoryProduct { get; set; }
    }
}