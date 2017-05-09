using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class PostModel : IEntityModel<Post>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public int PrecinctId { get; set; }
        public string PrecinctName { get; set; }
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int ProvincedId { get; set; }
        public string ProvinceName { get; set; }
        public string Price { get; set; }
        public string Status { get; set; }
        public bool IsAdvertise { get; set; }
        public bool IsDeleted { get; set; }

        public PostModel()
        {

        }
        public PostModel(Post entity)
        {
            this.MapFromEntity(entity);
        }
        public Post ToEntity()
        {
            return new Post()
            {
                Id = this.Id,
                Description = this.Description,
                AlbumId = this.AlbumId,
                PrecinctId = this.PrecinctId,
                DistrictId = this.DistrictId,
                ProvincedId = this.ProvincedId,
                Price = this.Price,
                Status = this.Status,
                IsAdvertise = this.IsAdvertise

            };
        }

        public IEntityModel<Post> MapFromEntity(Post entity)
        {
            this.Id = entity.Id;
            this.Description = entity.Description;
            this.AlbumId = entity.Album.Id;
            this.AlbumName = entity.Album.Name;
            this.PrecinctId = entity.Precinct.Id;
            this.PrecinctName = entity.Precinct.Name;
            this.DistrictId = entity.District.Id;
            this.DistrictName = entity.District.Name;
            this.ProvincedId = entity.ProvincedId;
            this.ProvinceName = entity.Province.Name;
            this.Price = entity.Price;
            this.Status = entity.Status;
            this.IsAdvertise = entity.IsAdvertise;
            this.IsDeleted = entity.IsDeleted;
            return this;
        }

        public void UpdateEntity(Post entity)
        {
            entity.Id = this.Id;
            entity.Description = this.Description;
            entity.AlbumId = this.AlbumId;
            entity.PrecinctId = this.PrecinctId;
            entity.DistrictId = this.DistrictId;
            entity.ProvincedId = this.ProvincedId;
            entity.Price = this.Price;
            entity.Status = this.Status;
            entity.IsAdvertise = this.IsAdvertise;
            entity.IsDeleted = this.IsDeleted;
        }

    }
}