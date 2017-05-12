using System.Web;
using System.Web.Optimization;

namespace OriFood
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //user
            bundles.Add(new ScriptBundle("~/bundles/user").Include(
                "~/Scripts/app/user.viewmodel.js"));

            //login
            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                "~/Scripts/app/login.viewmodel.js"));









            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootstrap-datepicker.js",
                "~/Scripts/locales/bootstrap-datepicker.vi.js",
                "~/Scripts/bootstrap-clockpicker.js",
                "~/Scripts/jQuery.FileUpload/jquery.fileupload.js",
                "~/Scripts/jQuery.FileUpload/jquery.fileupload-process.js",
                "~/Scripts/jQuery.FileUpload/jquery.fileupload-validate.js",
                "~/Scripts/summernote.min.js",
                "~/Scripts/jquery.tinyscrollbar.js",
                "~/Scripts/respond.js"));


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                           "~/Scripts/jquery-{version}.js",
                           "~/Scripts/jquery-ui-{version}.js",
                           "~/Scripts/jquery.xdomainrequest.min.js",
                           "~/Scripts/jquery.cookie.js",
                           "~/Scripts/jquery.signalR-2.1.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout-{version}.js",
                "~/Scripts/knockout.validation.js",
                "~/Scripts/koGrid-2.1.0.debug.js",
                "~/Scripts/koGridModel.js",
                "~/Scripts/knockout-switch-case.js",
                "~/Scripts/knockout.extension.js",
                "~/Scripts/knockout.component.js",
                "~/Scripts/koDropdownTree.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/sammy-{version}.js",
                "~/Scripts/app/common.js",
                "~/Scripts/toastr.js",
                "~/Content/prettify/jquery.slimscroll.min.js",
                "~/Content/prettify/prettify.js",
                "~/Scripts/moment.js",
                "~/Scripts/moment-with-locales.js",
                "~/Scripts/numeral/numeral.js",
                "~/Scripts/numeral/languages/vi-vn.js",
                "~/Scripts/string.js",
                "~/Scripts/app/app.datamodel.js",
                "~/Scripts/app/app.viewmodel.js",
                "~/Scripts/rome.js",
                "~/Scripts/require.js",
                "~/Scripts/underscore.js",
                "~/Scripts/json2.js",
                "~/Scripts/swfobject.js",
                "~/Scripts/jquery.maskMoney.js",
                "~/Scripts/jquery.autosize.js",
                //"~/Scripts/downloadify.min.js",
                "~/Scripts/app/_run.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css",
                 "~/Content/bootstrap-datepicker.css",
                 "~/Content/bootstrap-datepicker3.css",
                 "~/Content/bootstrap-clockpicker.css",
                 "~/Content/jQuery.FileUpload/css/jquery.fileupload.css",
                 "~/Content/jQuery.FileUpload/css/jquery.fileupload-ui.css",
                 "~/Content/summernote.css",
                 "~/Content/summernote-bs3.css",
                 "~/Content/KoGrid.css",
                 "~/Content/KoDropdownTree.css",
                 //"~/Content/style.css",
                 "~/Content/font-awesome.min.css",
                 "~/Content/rome.css",
                 "~/Content/toastr.css",
                 "~/Content/prettify/prettify.css"
                 ));
            bundles.Add(new StyleBundle("~/Content/error").Include(
               "~/Content/css/style.css"
                 ));


            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
#if DEBUG
            BundleTable.EnableOptimizations = false;
#endif
        }
    }
}
