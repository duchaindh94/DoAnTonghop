using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class RoleModel : IEntityModel<Role>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }

        public RoleModel()
        {

        }
        public RoleModel(Role entity)
        {
            this.MapFromEntity(entity);
        }
        public Role ToEntity()
        {
            return new Role()
            {
                Id = this.Id,
                Name = this.Name,
            };
        }

        public IEntityModel<Role> MapFromEntity(Role entity)
        {
            this.Id = entity.Id;
            this.Name = entity.Name;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Role entity)
        {
            entity.Id = this.Id;
            entity.Name = this.Name;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}