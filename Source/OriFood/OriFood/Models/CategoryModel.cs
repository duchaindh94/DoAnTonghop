using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class CategoryModel : IEntityModel<Category>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public CategoryModel()
        {

        }
        public CategoryModel(Category entity)
        {
            this.MapFromEntity(entity);
        }
        public Category ToEntity()
        {
            return new Category()
            {
                Id = this.Id,
                Name = this.Name,
                Status = this.Status

            };
        }

        public IEntityModel<Category> MapFromEntity(Category entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Category entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}