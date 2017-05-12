using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class AlbumCommentModel : IEntityModel<AlbumComment>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public AlbumCommentModel()
        {

        }
        public AlbumCommentModel(AlbumComment entity)
        {
            this.MapFromEntity(entity);
        }
        public AlbumComment ToEntity()
        {
            return new AlbumComment()
            {
                Id = this.Id,
                AlbumId = this.AlbumId,
                Description = this.Description,
                Status = this.Status
            };
        }

        public IEntityModel<AlbumComment> MapFromEntity(AlbumComment entity)
        {
            this.Id = entity.Id;
            this.AlbumId = entity.Album.Id;
            this.AlbumName = entity.Album.Name;
            this.Description = entity.Description;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(AlbumComment entity)
        {
            entity.Id = this.Id;
            entity.AlbumId = this.AlbumId;
            entity.Description = this.Description;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}