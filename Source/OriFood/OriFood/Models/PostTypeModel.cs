using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PostTypeModel : IEntityModel<PostType>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public PostTypeModel()
        {

        }
        public PostTypeModel(PostType entity)
        {
            this.MapFromEntity(entity);
        }
        public PostType ToEntity()
        {
            return new PostType()
            {
                Id = this.Id,
                PostId = this.PostId,
                TypeId = this.TypeId,
                Status = this.Status

            };
        }

        public IEntityModel<PostType> MapFromEntity(PostType entity)
        {
            this.Id = entity.Id;
            this.PostId = entity.Post.Id;
            this.TypeId = entity.Type.Id;
            this.TypeName = entity.Type.Name;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(PostType entity)
        {
            entity.Id = this.Id;
            entity.PostId = this.PostId;
            entity.TypeId = this.TypeId;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}