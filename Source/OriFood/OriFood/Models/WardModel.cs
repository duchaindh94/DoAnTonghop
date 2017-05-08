using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PrecinctModel : IEntityModel<Precinct>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public int DistrictId { get; set; }

        public string DistrictName { get; set; }

        public PrecinctModel()
        {

        }
        public PrecinctModel(Precinct entity)
        {
            this.MapFromEntity(entity);
        }
        public Precinct ToEntity()
        {
            return new Precinct()
            {
                Id = this.Id,
                Name = this.Name,
                DistrictId = this.DistrictId,
            };
        }

        public IEntityModel<Precinct> MapFromEntity(Precinct entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.DistrictId = entity.DistrictId;
            this.DistrictName = entity.District.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Precinct entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.DistrictId = this.DistrictId;
            entity.IsDeleted = this.IsDeleted;
        }
    }
}