using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class DistrictModel : IEntityModel<District>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public int ProvinceId { get; set; }

        public string ProvinceName { get; set; }

        public DistrictModel()
        {

        }
        public DistrictModel(District entity)
        {
            this.MapFromEntity(entity);
        }
        public District ToEntity()
        {
            return new District()
            {
                Id = this.Id,
                Name = this.Name,
                ProvinceId = this.ProvinceId,
            };
        }

        public IEntityModel<District> MapFromEntity(District entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.ProvinceId = entity.ProvinceId;
            this.ProvinceName = entity.Province.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(District entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.ProvinceId = this.ProvinceId;
            entity.IsDeleted = this.IsDeleted;
        }
    }
}