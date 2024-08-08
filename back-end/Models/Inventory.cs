using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class Inventory
    {
        public int InventoryID { get; set; }
        public int ProductID { get; set; }
        public int WarehouseID { get; set; }
        public int StockQuantity { get; set; }

        public Product Product { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}