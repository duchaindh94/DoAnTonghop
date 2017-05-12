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
    [Table("Posts")]
    public class Post : IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Description")]
        public string Description { get; set; }


        [Required]
        public int AlbumId { get; set; }


        [Required]
        public int PrecinctId { get; set; }


        [Required]
        public int DistrictId { get; set; }


        [Required]
        public int ProvincedId { get; set; }


        [Required]
        [StringLength(10)]
        public string Price { get; set; }
        

        [ForeignKey("AlbumId")]
        public virtual Album Album { get; set; }
        [ForeignKey("ProvinceId")]
        public virtual Province Province { get; set; }
        [ForeignKey("DistrictId")]
        public virtual District District { get; set; }
        [ForeignKey("PrecinctId")]
        public virtual Precinct Precinct { get; set; }

        [Required]
        public string Status { get; set; }
        public bool IsAdvertise { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedByUserId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}