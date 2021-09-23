using CustomerInfo.DB;
using CustomerInfo.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerInfo.Controllers
{
    public class HomeController : Controller
    {
        Dbcon conn = new Dbcon();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        //private SqlConnection con;

        public ActionResult infosys()
        {


            return View();

        }
        public ActionResult InfoDashboard()
        {


            return View();

        }


        [HttpPost]
        public ActionResult GetJsonData(CustomerDetail data)
        {

            string message;
            conn.SaveData(data, out message);
            return Json(new JsonResult { Data = message });

        }
        [HttpPost]
        public ActionResult GetData()
        {
            List<detailInfo> resultList = conn.GetMyData();
            return Json(new JsonResult { Data = resultList });

        }

        [HttpPost]
        public ActionResult DeleteData(int? id)
        {
            string message;
            conn.DeleteMyData(id, out message);
            return Json(new JsonResult { Data = message });

        }

        [HttpPost]
        public ActionResult EditData(int? Id)
        {
            CustomerDetail EditList = conn.EditMyData(Id);
            return Json(new JsonResult { Data = EditList, JsonRequestBehavior = JsonRequestBehavior.DenyGet });

        }

        [HttpPost]
        public ActionResult UpdateAllData(CustomerDetail data)
        {

            string message;
            conn.UpdateData(data, out message);
            return Json(new JsonResult { Data = message });

        }


    }
}