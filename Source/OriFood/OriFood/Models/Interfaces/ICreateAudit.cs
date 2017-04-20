using OriFood.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OriFood.Models.Interfaces
{
    public interface ICreatedByUser
    {
        DateTime CreatedDate { get; set; }
        int CreatedByUserId { get; set; }
        ApplicationUser CreatedByUser { get; set; }
    }

    public interface ICreatedByUserRole
    {
        DateTime CreatedDate { get; set; }
        int CreatedByUserRoleId { get; set; }
        Role CreatedByUserRole { get; set; }
    }
}
