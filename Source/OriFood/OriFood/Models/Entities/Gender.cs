using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OriFood.Models.Entities
{
    [Table("Genders")]
    public class Gender : IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        [Description("Giới tính")]
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

    }
}