using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PostLikeModel : IEntityModel<PostLike>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public PostLikeModel()
        {

        }
        public PostLikeModel(PostLike entity)
        {
            this.MapFromEntity(entity);
        }
        public PostLike ToEntity()
        {
            return new PostLike()
            {
                Id = this.Id,
                PostId = this.PostId,
                Status = this.Status

            };
        }

        public IEntityModel<PostLike> MapFromEntity(PostLike entity)
        {
            this.Id = entity.Id;
            this.PostId = entity.PostId;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(PostLike entity)
        {
            entity.Id = this.Id;
            entity.PostId = this.PostId;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}