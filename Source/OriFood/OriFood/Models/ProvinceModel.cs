using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class ProvinceModel : IEntityModel<Province>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public ProvinceModel()
        {

        }
        public ProvinceModel(Province entity)
        {
            this.MapFromEntity(entity);
        }
        public Province ToEntity()
        {
            return new Province()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }

        public IEntityModel<Province> MapFromEntity(Province entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Province entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.IsDeleted = this.IsDeleted;
        }
    }
}