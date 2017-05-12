using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PostCommentModel : IEntityModel<PostComment>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public PostCommentModel()
        {

        }
        public PostCommentModel(PostComment entity)
        {
            this.MapFromEntity(entity);
        }
        public PostComment ToEntity()
        {
            return new PostComment()
            {
                Id = this.Id,
                PostId = this.PostId,
                Description = this.Description,
                Status = this.Status

            };
        }

        public IEntityModel<PostComment> MapFromEntity(PostComment entity)
        {
            this.Id = entity.Id;
            this.PostId = entity.Post.Id;
            this.Description = entity.Description;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(PostComment entity)
        {
            entity.Id = this.Id;
            entity.PostId = this.PostId;
            entity.Description = this.Description;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}