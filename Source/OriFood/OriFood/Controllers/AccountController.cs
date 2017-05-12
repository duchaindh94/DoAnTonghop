using OriFood.Helpers;
using OriFood.Models;
using OriFood.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OriFood.Controllers
{
    public class AccountController : BaseController
    {
        // GET: Account
        public ActionResult Index()
        {
            if (CurrentUser.Id == 0)
            {
                return RedirectToAction("Login", "Account", new { url = "/Account"});
            }
            return View();
        }

        public ActionResult Login(string url = "/")
        {
            ViewBag.url = url;
            return View();
        }

        public ActionResult CheckLogin(string userName, string password, string url="/")
        {
            var rs = db.Users.Where(b => b.UserName == userName && b.FullName == password).FirstOrDefault();
            if (rs != null)
            {
                Session.Add("UserId", rs.Id);
                Session.Add("UserName", rs.UserName);

            }
            return Redirect(url);
            //return RedirectToAction("Index", "Home");
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult ActionRegister(UserModel user)
        {
            user.RoleId = 3;
            user.CreatedDate = DateTime.Now;
            ApplicationUser u = user.ToEntity();
            db.Users.Add(u);
            db.SaveChanges();
            var rs = db.Users.Where(b => b.UserName == user.UserName && b.Email == user.Email).FirstOrDefault();
            Session.Clear();
            Session.Add("UserId", rs.Id);
            Session.Add("UserName", rs.UserName);

            return RedirectToAction("Index");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public JsonResult GetInfoCurrentUser()
        {
            return Json(CurrentUser, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult LoginJson(string userName, string password)
        {

            if (CurrentUser.Id != 0)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session.Clear();
                var rs = db.Users.Where(b => b.UserName == userName && b.FullName == password).FirstOrDefault();
                if (rs != null)
                {
                    Session.Add("UserId", rs.Id);
                    Session.Add("UserName", rs.UserName);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            return null;
        }


    }
}