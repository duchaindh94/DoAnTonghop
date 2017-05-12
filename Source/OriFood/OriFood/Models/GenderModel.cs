using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class GenderModel : IEntityModel<Gender>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public GenderModel()
        {

        }
        public GenderModel(Gender entity)
        {
            this.MapFromEntity(entity);
        }
        public Gender ToEntity()
        {
            return new Gender()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }

        public IEntityModel<Gender> MapFromEntity(Gender entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Gender entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.IsDeleted = this.IsDeleted;
        }
    }
}