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
    [Table("AlbumLikes")]
    public class AlbumLike : IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        [Required]
        public int AlbumId { get; set; }

        [Required]
        [Display(Name = "Status")]
        public string Status { get; set; }


        [ForeignKey("AlbumId")]
        public virtual Album Album { get; set; }

        public bool IsDeleted { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}