using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PostCategoryModel : IEntityModel<PostCategory>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public PostCategoryModel()
        {

        }
        public PostCategoryModel(PostCategory entity)
        {
            this.MapFromEntity(entity);
        }
        public PostCategory ToEntity()
        {
            return new PostCategory()
            {
                Id = this.Id,
                PostId = this.PostId,
                CategoryId = this.CategoryId,
                Status = this.Status

            };
        }

        public IEntityModel<PostCategory> MapFromEntity(PostCategory entity)
        {
            this.Id = entity.Id;
            this.PostId = entity.Post.Id;
            this.CategoryId = entity.Category.Id;
            this.CategoryName = entity.Category.Name;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(PostCategory entity)
        {
            entity.Id = this.Id;
            entity.PostId = this.PostId;
            entity.CategoryId = this.CategoryId;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}