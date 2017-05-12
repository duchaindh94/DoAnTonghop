using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using OriFood.Models.Entities;

namespace OriFood
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
            : base("name=ApplicationDbContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<ApplicationUser> Users { get; set; }
        public virtual DbSet<Precinct> Precincts { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Album> Albums { get; set; }
        //public virtual DbSet<AlbumComment> AlbumComments { get; set; }
        //public virtual DbSet<AlbumLike> AlbumLikes { get; set; }
        //public virtual DbSet<Category> Categories { get; set; }
        //public virtual DbSet<Image> Images { get; set; }
        //public virtual DbSet<PostCategory> PostCategorys { get; set; }
        //public virtual DbSet<PostComment> PostComments { get; set; }
        //public virtual DbSet<PostLike> PostLikes { get; set; }
        //public virtual DbSet<Report> Reports { get; set; }
        //public virtual DbSet<SavePost> SavePosts { get; set; }


    }
}
