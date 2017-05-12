using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace OriFood.Models.Entities
{
    [Table("Wards")]
    public class Ward : IIdentifier,IsDeleted
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public bool IsDeleted { get; set; }


        public int DistrictId { get; set; }

        public virtual District District { get; set; }
    }
}
