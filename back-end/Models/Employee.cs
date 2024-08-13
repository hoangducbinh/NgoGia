using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;



namespace back_end.Models
{
    public class Employee: IdentityUser
    {
        public int EmployeeID { get; set; }
        public required string EmployeeName { get; set; }
        public required string Position { get; set; }
    }
}