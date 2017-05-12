using OriFood.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OriFood.Models.Interfaces
{
    public interface IUpdatedByUser
    {
        DateTime? UpdatedDate { get; set; }
        int? UpdatedByUserId { get; set; }
        ApplicationUser UpdatedByUser { get; set; }
    }

    public interface IUpdatedByUserRole
    {
        DateTime? UpdatedDate { get; set; }
        int? UpdatedByUserRoleId { get; set; }
        Role UpdatedByUserRole { get; set; }
    }
}
