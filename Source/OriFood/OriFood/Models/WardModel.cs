using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class WardModel : IEntityModel<Ward>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public int DistrictId { get; set; }

        public string DistrictName { get; set; }

        public WardModel()
        {

        }
        public WardModel(Ward entity)
        {
            this.MapFromEntity(entity);
        }
        public Ward ToEntity()
        {
            return new Ward()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }

        public IEntityModel<Ward> MapFromEntity(Ward entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Ward entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.IsDeleted = this.IsDeleted;
        }
    }
}