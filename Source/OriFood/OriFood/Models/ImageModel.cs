using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class ImageModel : IEntityModel<Image>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public ImageModel()
        {

        }
        public ImageModel(Image entity)
        {
            this.MapFromEntity(entity);
        }
        public Image ToEntity()
        {
            return new Image()
            {
                Id = this.Id,
                Name = this.Name,
                Description = this.Description,
                Status = this.Status

            };
        }

        public IEntityModel<Image> MapFromEntity(Image entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.Description = entity.Description;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Image entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.Description = this.Description;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}