using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class AlbumLikeModel : IEntityModel<AlbumLike>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }

        public AlbumLikeModel()
        {

        }
        public AlbumLikeModel(AlbumLike entity)
        {
            this.MapFromEntity(entity);
        }
        public AlbumLike ToEntity()
        {
            return new AlbumLike()
            {
                Id = this.Id,
                AlbumId = this.AlbumId,
                Status = this.Status
            };
        }

        public IEntityModel<AlbumLike> MapFromEntity(AlbumLike entity)
        {
            this.Id = entity.Id;
            this.AlbumId = entity.Album.Id;
            this.AlbumName = entity.Album.Name;
            this.Status = entity.Status;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(AlbumLike entity)
        {
            entity.Id = this.Id;
            entity.AlbumId = this.AlbumId;
            entity.Status = this.Status;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}