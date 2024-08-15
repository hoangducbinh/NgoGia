using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class CategoryProduct
    {
        public string CategoryProductID { get; set; }
        public string CategoryProductName { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}