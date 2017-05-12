using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OriFood.Models
{
    public class UserModel : IEntityModel<ApplicationUser>, IIdentifier, IsDeleted
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string FullName { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }

        public int? GenderId { get; set; }

        public string GenderName { get; set; }

        public bool IsLock { get; set; }

        public string PhoneNumber { get; set; }

        public string Avatar { get; set; }

        public string Cover { get; set; }

        public string SecurityStamp { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreatedDate { get; set; }

        public UserModel()
        {

        }
        public UserModel(ApplicationUser entity)
        {
            this.MapFromEntity(entity);
        }
        public ApplicationUser ToEntity()
        {
            return new ApplicationUser()
            {
                Id = this.Id,
                UserName = this.UserName,
                Email = this.Email,
                PasswordHash = this.PasswordHash,
                FullName = this.FullName,
                RoleId = this.RoleId,
                GenderId = this.GenderId,
                IsLock = this.IsLock,
                PhoneNumber = this.PhoneNumber,
                Avatar = this.Avatar,
                Cover = this.Cover,
                SecurityStamp = this.SecurityStamp,
                CreatedDate = this.CreatedDate,
            };
        }

        public IEntityModel<ApplicationUser> MapFromEntity(ApplicationUser entity)
        {
            this.Id = entity.Id;
            this.UserName = entity.UserName;
            this.Email = entity.Email;
            this.PasswordHash = entity.PasswordHash;
            this.FullName = entity.FullName;
            this.RoleId = entity.RoleId;
            this.RoleName = entity.Role.Name;
            this.GenderId = entity.GenderId;
            if (entity.GenderId.HasValue)
            {
                this.GenderName = entity.Gender.Name;
            }
            this.IsLock = entity.IsLock;
            this.PhoneNumber = entity.PhoneNumber;
            this.Avatar = entity.Avatar;
            this.Cover = entity.Cover;
            this.SecurityStamp = entity.SecurityStamp;
            this.IsDeleted = entity.IsDeleted;
            this.CreatedDate = entity.CreatedDate;
            return this;
        }

        public void UpdateEntity(ApplicationUser entity)
        {
            entity.Id = this.Id;
            entity.UserName = this.UserName;
            entity.Email = this.Email;
            entity.PasswordHash = this.PasswordHash;
            entity.FullName = this.FullName;
            entity.RoleId = this.RoleId;
            entity.GenderId = this.GenderId;
            entity.IsLock = this.IsLock;
            entity.PhoneNumber = this.PhoneNumber;
            entity.Avatar = this.Avatar;
            entity.Cover = this.Cover;
            entity.SecurityStamp = this.SecurityStamp;
            entity.IsDeleted = this.IsDeleted;
            entity.CreatedDate = this.CreatedDate;
        }
    }
}