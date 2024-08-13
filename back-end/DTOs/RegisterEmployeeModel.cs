using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
   public class RegisterEmployeeModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string EmployeeName { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public string Password { get; set; }
    }

}