using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using OriFood.Models.Entities;

namespace OriFood.Models.Entities
{
    [Table("PostTypes")]
    public class PostType : IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int TypeId { get; set; }

        [Required]
        [Display(Name = "Status")]
        public string Status { get; set; }


        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }

        [ForeignKey("TypeId")]
        public virtual Type Type { get; set; }

        public bool IsDeleted { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}