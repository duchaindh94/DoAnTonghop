using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class SavePostModel : IEntityModel<SavePost>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public SavePostModel()
        {

        }
        public SavePostModel(SavePost entity)
        {
            this.MapFromEntity(entity);
        }
        public SavePost ToEntity()
        {
            return new SavePost()
            {
                Id = this.Id,
                PostId = this.PostId,
                Status = this.Status

            };
        }

        public IEntityModel<SavePost> MapFromEntity(SavePost entity)
        {
            this.Id = entity.Id;
            this.PostId = entity.Post.Id;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(SavePost entity)
        {
            entity.Id = this.Id;
            entity.PostId = this.PostId;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}