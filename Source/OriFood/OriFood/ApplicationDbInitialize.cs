using Microsoft.AspNet.Identity;
using OriFood.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OriFood
{
    public class ApplicationDbInitialize : DropCreateDatabaseIfModelChanges<ApplicationDbContext>
    {
        public override void InitializeDatabase(ApplicationDbContext context)
        {
            base.InitializeDatabase(context);
        }
        protected override void Seed(ApplicationDbContext context)
        {
            try
            {
                context.Genders.Add(CreateGender("Nam"));
                context.Genders.Add(CreateGender("Nữ"));
                context.SaveChanges();

                context.Roles.Add(CreateRole("Super Admin"));
                context.Roles.Add(CreateRole("Admin"));
                context.Roles.Add(CreateRole("User"));
                context.SaveChanges();

                context.Users.Add(CreateUser("administrator", "administrator", "123456", 1, 1, "0989510594", "admin@gmail.com", "nothing", "nothing"));
                context.Users.Add(CreateUser("admin", "admin", "123456", 2, 1, "01235255326", "ad@gmail.com", "nothing", "nothing"));
                context.Users.Add(CreateUser("user", "user", "123456", 3, 1, "01685965865", "user@gmail.com", "nothing", "nothing"));
                context.SaveChanges();

                context.Provinces.Add(CreateProvince("Hà Nội"));
                context.Provinces.Add(CreateProvince("Hồ Chí Minh"));
                context.SaveChanges();

                context.Districts.Add(CreateDistrict("Ba Đình", 1));
                context.Districts.Add(CreateDistrict("Hoàn Kiếm", 1));
                context.Districts.Add(CreateDistrict("Gò Vấp", 2));
                context.Districts.Add(CreateDistrict("Thủ Đức", 2));
                context.SaveChanges();
            }
            catch (System.Exception ex) //Fail to initialize, drop the database
            {
                context.Dispose();
                using (var newContext = new ApplicationDbContext())
                {
                    newContext.Database.Delete();
                }
                throw ex;
            }

        }

        #region Helper
        private Gender CreateGender(string name)
        {
            return new Gender()
            {
                Name = name,
            };
        }

        private Role CreateRole(string name)
        {
            return new Role()
            {
                Name = name,
            };
        }

        private ApplicationUser CreateUser(string username, string name, string password, int roleId, int? genderId, string phone, string email, string avatar, string cover)
        {
            PasswordHasher hasher = new PasswordHasher();
            return new ApplicationUser()
            {
                UserName = username,
                PasswordHash = hasher.HashPassword(password),
                FullName = name,
                RoleId = roleId,
                GenderId = genderId,
                IsLock = false,
                PhoneNumber = phone,
                Email = email,
                Avatar = avatar,
                Cover = cover,
                IsDeleted = false,
                CreatedDate = DateTime.Now,
                SecurityStamp = new Random().Next().ToString()
            };
        }

        private Province CreateProvince(string name)
        {
            return new Province()
            {
                Name = name,
            };
        }

        private District CreateDistrict(string name, int provinceId)
        {
            return new District()
            {
                ProvinceId = provinceId,
                Name = name,
            };
        }
        #endregion
    }
}