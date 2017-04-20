using OriFood.Helpers;
using OriFood.Models;
using OriFood.Models.Entities;
using OriFood.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OriFood.Helpers
{
    public abstract class BaseController : Controller
    {
        public ApplicationDbContext db = new ApplicationDbContext();
        public UserModel CurrentUser
        {
            get
            {
                if (Session["UserId"] == null)
                {
                    return new UserModel();
                }
                else
                {
                    int userId = (int)Session["UserId"];
                    ApplicationUser u = db.Users.ToList().Find(x => x.Id == userId);
                    UserModel user = new UserModel(u);
                    return user;
                }
            }
        }
    }

    public abstract class BaseController<TEntity, TModel> : BaseController
        where TEntity : class, IIdentifier, new()
        where TModel : class, IEntityModel<TEntity>, new()
    {
        public TEntity Put(TModel model)
        {
            return model.ToEntity();
        }
    }
}